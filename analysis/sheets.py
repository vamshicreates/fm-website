import json,os
from PIL import Image, ImageDraw
R='/sessions/'  # placeholder
import sys
root=sys.argv[1]
d=json.load(open(root+'/src/data/posts.json'))
posts=sorted(d['posts'],key=lambda p:p['date'])
T=110; cols=14; per=cols*10
os.makedirs('sheets',exist_ok=True)
for s in range(0,len(posts),per):
    chunk=posts[s:s+per]; rows=(len(chunk)+cols-1)//cols
    sh=Image.new('RGB',(cols*T,rows*(T+14)),'white'); dr=ImageDraw.Draw(sh)
    for i,p in enumerate(chunk):
        try:
            im=Image.open(root+'/public'+p['image']).convert('RGB'); im.thumbnail((T,T))
            x=(i%cols)*T; y=(i//cols)*(T+14); sh.paste(im,(x,y))
            dr.text((x+2,y+T),f"{s+i} {p['date'][:7]}",fill='black')
        except Exception as e: pass
    sh.save(f'sheets/sheet_{s//per:02d}.jpg',quality=80)
print(len(posts))
