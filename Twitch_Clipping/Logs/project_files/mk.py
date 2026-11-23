# mk.py name src.mp4 transcript.jsonl layout.json segs "a-b,a-b" [exclude "a-b,..."]
import json,sys,re
name,src,tr,lay,segs=sys.argv[1:6]; excl=sys.argv[6] if len(sys.argv)>6 else ''
rng=lambda s:[tuple(map(float,x.split('-'))) for x in s.split(',') if x]
segs=rng(segs); ex=rng(excl)
CENS={'fuck':'f*ck','fucking':'f*cking','shit':'sh*t','bitch':'b*tch','fucked':'f*cked'}
words=[]
for l in open(tr):
    d=json.loads(l)
    for a,b,w in d.get('w',[]):
        w=re.sub(r"[^\w'¿¡*-]","",w.strip()).lower().strip('¿¡')
        if not w: continue
        w=CENS.get(w,w)
        if any(a<y and b>x for x,y in ex): continue
        if any(a>=x-0.05 and b<=y+0.3 for x,y in segs): words.append(["A",round(a,2),round(b,2),w])
L=json.load(open(lay))
spec={"out":f"/home/user/ubiquitous-chainsaw/Twitch_Clipping/Edited_Clips/With_Subtitles/{name}.mp4",
 "sources":{"A":src},"layout":{"A":L["layout"]},"cam_h":L["cam_h"],"segments":[["A",a,b] for a,b in segs],
 "streamer":words,"cap_y":L["cap_y"],"cap_fs":62}
spec.update(L.get("extra",{}))
json.dump(spec,open(f"{name}.json","w"),indent=1); print(name,len(words),'words',sum(b-a for a,b in segs),'s')
