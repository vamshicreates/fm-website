import json,sys
from PIL import Image, ImageDraw
root=sys.argv[1]; a,b=int(sys.argv[2]),int(sys.argv[3]); out=sys.argv[4]
d=json.load(open(root+'/src/data/posts.json'));P=sorted(d['posts'],key=lambda p:p['date'])[a:b]
T=170;cols=12;rows=(len(P)+cols-1)//cols
sh=Image.new('RGB',(cols*T,rows*(T+14)),'white');dr=ImageDraw.Draw(sh)
for i,p in enumerate(P):
  im=Image.open(root+'/public'+p['image']).convert('RGB');im.thumbnail((T-4,T-4))
  x=(i%cols)*T;y=(i//cols)*(T+14);sh.paste(im,(x,y));dr.text((x+2,y+T-2),f"{a+i} {p['date'][:7]}",fill='black')
sh.save(out,quality=78)
