// Offline support: keep the app's files on the device so it works without a connection.
const CACHE="pco-prep-v2";
const FILES=["./","index.html","privacy.html","manifest.webmanifest","icon-192.png","icon-512.png","maskable-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;
  if(req.mode==="navigate"){e.respondWith(fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy));return r;}).catch(()=>caches.match(req).then(r=>r||caches.match("index.html"))));return;}
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok||r.type==="opaque"){const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return r;})));
});
