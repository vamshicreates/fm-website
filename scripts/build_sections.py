"""Regroups every @fakemuchatlu post into sections by *visual style*.
Boundaries were chosen by eye from date-ordered contact sheets of all posts
(see analysis/). Each section is a contiguous run in time where the look holds.
Run: python3 scripts/build_sections.py  (from the fm-website folder)"""
import json, glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
old = json.load(open(f'{ROOT}/src/data/posts.json'))
posts = {p['id']: p for p in old['posts']}

# add the 4 video-only posts the first pipeline skipped
for f in glob.glob(f'{ROOT}/posts_all/*.mp4.json'):
    j = json.load(open(f)); pid = j['post_id']
    if pid in posts: continue
    vid = os.path.basename(f)[:-5]; stem = vid[:-4]
    if not os.path.exists(f'{ROOT}/public/images/{stem}.webp'): continue
    posts[pid] = {'id': pid, 'shortcode': j['post_shortcode'],
        'url': j.get('post_url') or f"https://www.instagram.com/p/{j['post_shortcode']}/",
        'date': j['date'], 'caption': (j.get('description') or '').strip(),
        'likes': j.get('likes') or 0, 'image': f'/images/{stem}.webp',
        'images': [f'/images/{stem}.webp'], 'video': f'/videos/{vid}'}

# (first post index in date order of the original 553 image posts, section)
SECTIONS = [
  ('stamp',   'The Fm Stamp',        'Charcoal and white squares, one centred line, the yellow “#Fake Muchatlu” tag up top and the chunky Fm mark in the corner. Where it all started.'),
  ('dashed',  'Dashed Frames',       'The Fm logo moves to the top, cards get a dotted border and a tiny mascot signs off at the bottom. A short, tidy experiment.'),
  ('tweets',  'Tweet Cards',         'Everything becomes a tweet: avatar, handle, a line of Telugu-English and lots of white space. Lockdown-era thoughts, Season 01s and the occasional meme.'),
  ('paper',   'Paper Notes',         '“Stories by a mediocre Indian”: typewriter serif on grey paper and brown kraft. Quieter, slower, more writerly.'),
  ('notes',   'Clean Notes & Chats', 'Bare white notes with a small Fm stamp, chat-bubble screenshots and the weekly “mental health challenge” lists.'),
  ('serif',   'Dark Serif',          'Black cards, big bookish serif, mustard words that carry the punch. A brief, moody run.'),
  ('memes',   'Meme Tweets',         'Back to tweets, now with the red FM avatar and Telugu cinema stills doing half the talking.'),
  ('notesapp','Notes App',           'Long plain-text notes, numbered lists and iMessage bubbles. The words, unstyled.'),
  ('dark',    'After Dark',          'Pitch-black cards with heavy white type and the odd neon word, plus serif lines on white.'),
  ('photo',   'Photo Poems',         'Grainy landscapes, beaches and open skies with a line of serif text laid over them.'),
  ('poster',  'Poster Lab',          'Full design mode: crimson, cream and forest green, condensed poster type, halftone cut-outs, a ghost in sunglasses.'),
  ('red',     'The Red Room',        'Every card on deep crimson with mustard italic serif and hand-drawn characters. The current look.'),
]
STARTS = [0, 96, 120, 287, 330, 358, 366, 410, 434, 454, 470, 532]

ordered_imgs = sorted((p for p in old['posts'] if not p.get('video')), key=lambda p: p['date'])
start_dates = [ordered_imgs[i]['date'] for i in STARTS]

def section_for(date):
    k = 0
    for i, d in enumerate(start_dates):
        if date >= d: k = i
    return k

def dims(path):
    try:
        with Image.open(f'{ROOT}/public{path}') as im: return im.size
    except Exception: return (800, 1000)

out_posts = []
for p in sorted(posts.values(), key=lambda p: p['date'], reverse=True):
    w, h = dims(p['image'])
    out_posts.append({'id': p['id'], 'shortcode': p['shortcode'], 'url': p['url'],
        'date': p['date'], 'caption': (p.get('caption') or '')[:160], 'likes': p.get('likes', 0),
        'image': p['image'], 'w': w, 'h': h, 'slides': p.get('slides') or len(p.get('images', [])) or 1,
        'video': p.get('video'), 'section': SECTIONS[section_for(p['date'])][0]})

secs = []
for i, (sid, title, blurb) in enumerate(SECTIONS):
    items = [p for p in out_posts if p['section'] == sid]
    ds = sorted(p['date'] for p in items)
    secs.append({'id': sid, 'no': i + 1, 'title': title, 'blurb': blurb,
                 'from': ds[0][:7], 'to': ds[-1][:7], 'count': len(items)})

profile = old['profile']; profile['postsCount'] = len(out_posts)
data = {'profile': profile, 'sections': secs, 'posts': out_posts}
json.dump(data, open(f'{ROOT}/src/data/posts.json', 'w'), ensure_ascii=False)
json.dump(data, open(f'{ROOT}/public/data/posts.json', 'w'), ensure_ascii=False)
for s in secs: print(s['no'], s['title'], s['from'], s['to'], s['count'])
print('total', len(out_posts))
