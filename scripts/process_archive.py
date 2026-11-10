import os
import glob
import json
from PIL import Image

POSTS_DIR = '/Users/rachanalekkala/Documents/Claude/fm-website/posts_all'
OUT_IMG_DIR = '/Users/rachanalekkala/Documents/Claude/fm-website/public/images'
OUT_JSON = '/Users/rachanalekkala/Documents/Claude/fm-website/src/data/posts.json'
OUT_PUBLIC_JSON = '/Users/rachanalekkala/Documents/Claude/fm-website/public/data/posts.json'

os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
os.makedirs(os.path.dirname(OUT_PUBLIC_JSON), exist_ok=True)

print("Scanning JSON metadata files...")
json_files = glob.glob(os.path.join(POSTS_DIR, '*.json'))

posts_map = {}

for jf in json_files:
    try:
        with open(jf, 'r', encoding='utf-8') as f:
            d = json.load(f)
        pid = d.get('post_id')
        if not pid:
            continue
        
        media_path = jf[:-5]
        if not os.path.exists(media_path):
            continue
            
        num = d.get('num', 1) or 1
        
        if pid not in posts_map:
            posts_map[pid] = {
                'id': pid,
                'shortcode': d.get('post_shortcode'),
                'url': d.get('post_url') or f"https://www.instagram.com/p/{d.get('post_shortcode')}/",
                'date': d.get('date'),
                'caption': (d.get('description') or '').strip(),
                'likes': d.get('likes', 0) or 0,
                'count': d.get('count', 1) or 1,
                'items': []
            }
        
        is_video = media_path.endswith('.mp4')
        posts_map[pid]['items'].append({
            'num': num,
            'path': media_path,
            'is_video': is_video
        })
    except Exception as e:
        pass

print(f"Total unique posts collected: {len(posts_map)}")

# Sort items within each post by num
for pid, p in posts_map.items():
    p['items'].sort(key=lambda x: x['num'])

# Sort posts newest first
sorted_posts = sorted(posts_map.values(), key=lambda x: x['date'] or '', reverse=True)

# Eras configuration
ERAS = [
    {
        'id': 'crimson-contemporary',
        'title': 'Era VI: Crimson & Contemporary',
        'years': '2025–2026',
        'subtitle': 'Bold vermilion & rich wine backgrounds with striking modern Telugu typography and sharp witty reflections.',
        'color': '#C92A2A',
        'accent': '#FF6B6B'
    },
    {
        'id': 'pastel-canvas',
        'title': 'Era V: Pastel & Tinted Canvas',
        'years': '2024',
        'subtitle': 'Subtle pastel tints, soft sky blue and warm parchment cards exploring life, friendship, and quiet observations.',
        'color': '#3B82F6',
        'accent': '#93C5FD'
    },
    {
        'id': 'midnight-charcoal',
        'title': 'Era IV: Midnight Charcoal & Dark Room',
        'years': '2022–2023',
        'subtitle': 'Monochromatic obsidian and deep graphite cards. Late-night unfiltered musings and raw conversational carousels.',
        'color': '#1E293B',
        'accent': '#64748B'
    },
    {
        'id': 'white-parchment',
        'title': 'Era III: White Parchment & Journal Notes',
        'years': '2020–2021',
        'subtitle': 'The prolific notebook era. Clean off-white paper, ink pen lettering, 90s Telugu nostalgia, and pandemic thoughts.',
        'color': '#D97706',
        'accent': '#FBBF24'
    },
    {
        'id': 'monochrome-quotes',
        'title': 'Era II: Monochromatic Square Reflections',
        'years': '2019',
        'subtitle': 'Square grid format, understated monochrome palettes, and punchy sarcastic social commentary.',
        'color': '#475569',
        'accent': '#94A3B8'
    },
    {
        'id': 'genesis-archives',
        'title': 'Era I: The Genesis & Raw Foundations',
        'years': '2018',
        'subtitle': 'The very beginning. Dark slate textures, square frames, and early philosophical verses that sparked Fake Muchatlu.',
        'color': '#0F172A',
        'accent': '#475569'
    }
]

def assign_era(date_str):
    if not date_str or len(date_str) < 4:
        return 'white-parchment'
    year = int(date_str[:4])
    if year >= 2025:
        return 'crimson-contemporary'
    elif year == 2024:
        return 'pastel-canvas'
    elif year in (2022, 2023):
        return 'midnight-charcoal'
    elif year in (2020, 2021):
        return 'white-parchment'
    elif year == 2019:
        return 'monochrome-quotes'
    else:
        return 'genesis-archives'

processed_posts = []
total_images_processed = 0

print("Processing images into WebP format...")
for i, p in enumerate(sorted_posts):
    era_id = assign_era(p['date'])
    post_images = []
    
    # Process up to 5 items per post for web carousel/slides
    for item in p['items']:
        src_path = item['path']
        if item['is_video']:
            continue
            
        base_name = os.path.basename(src_path)
        webp_name = os.path.splitext(base_name)[0] + '.webp'
        dest_path = os.path.join(OUT_IMG_DIR, webp_name)
        
        if not os.path.exists(dest_path):
            try:
                im = Image.open(src_path)
                w, h = im.size
                if w > 800:
                    new_h = int(h * (800 / w))
                    im = im.resize((800, new_h), Image.Resampling.LANCZOS)
                im.save(dest_path, 'WEBP', quality=82)
                total_images_processed += 1
            except Exception as e:
                pass
        
        if os.path.exists(dest_path):
            post_images.append(f"/images/{webp_name}")
    
    if not post_images:
        continue
        
    primary_image = post_images[0]
    
    processed_posts.append({
        'id': p['id'],
        'shortcode': p['shortcode'],
        'url': p['url'],
        'date': p['date'],
        'caption': p['caption'],
        'likes': p['likes'],
        'count': p['count'],
        'era': era_id,
        'image': primary_image,
        'images': post_images,
        'slides': len(post_images)
    })

print(f"Total posts ready: {len(processed_posts)}")
print(f"Total WebP images converted: {total_images_processed}")

output_data = {
    'profile': {
        'username': 'fakemuchatlu',
        'fullName': 'Fake Muchatlu',
        'url': 'https://www.instagram.com/fakemuchatlu/',
        'bio': 'Na stroke chaala amateurish ga untundhi.\nSCA cert. Making coffee, cleaning tables, mopping floors & pretending to be useful.\nCurrently: destitute.',
        'followers': '69.8K',
        'following': '278',
        'postsCount': len(processed_posts),
        'timeline': '2018 – 2026'
    },
    'eras': ERAS,
    'posts': processed_posts
}

with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

with open(OUT_PUBLIC_JSON, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)

print("Saved output JSON files successfully!")
