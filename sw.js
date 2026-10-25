const C="viaje-v1";const F=["./", "leaflet.js", "manifest.json", "tiles-15.json", "tiles-16.json", "tiles-fj-15.json", "tiles-fj-16.json", "tiles-fj-lo.json", "tiles-jp-15.json", "tiles-jp-16.json", "tiles-jp-lo.json", "tiles-lo.json", "tiles-tk-15.json", "tiles-tk-16.json", "tiles-tk-lo.json"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);
 if(u.origin===location.origin){ if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{caches.open(C).then(c=>c.put("./",r.clone()));return r}).catch(()=>caches.match("./")));return;}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{caches.open(C).then(c=>c.put(e.request,n.clone()));return n})));return;}
 if(u.host.includes("fonts.g")){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{caches.open(C).then(c=>c.put(e.request,n.clone()));return n})));}
});