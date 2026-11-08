const C="viaje-v1",T="viaje-tiles";const F=["./", "leaflet.js", "manifest.json", "tiles-15.json", "tiles-16.json", "tiles-fj-15.json", "tiles-fj-16.json", "tiles-fj-lo.json", "tiles-jp-15.json", "tiles-jp-16.json", "tiles-jp-lo.json", "tiles-lo.json", "tiles-tk-15.json", "tiles-tk-16.json", "tiles-tk-lo.json"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(async c=>{await c.add("./").catch(()=>{});for(const f of F){if(f==="./")continue;if(!(await c.match(f)))await c.add(f).catch(()=>{});}}))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==T).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const cacheFirst=(e,name)=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==="opaque"){const cl=n.clone();caches.open(name).then(c=>c.put(e.request,cl));}return n})));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);
 if(u.origin===location.origin){ if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{const cl=r.clone();caches.open(C).then(c=>c.put("./",cl));return r}).catch(()=>caches.match("./")));return;}
  if(u.pathname.endsWith("/sw.js"))return; cacheFirst(e,C);return;}
 if(u.host.includes("fonts.g"))cacheFirst(e,C);
 else if(u.host==="tile.openstreetmap.org")cacheFirst(e,T);
});