const CACHE_NAME='trix-pwa-v5-full';
const ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE_NAME)return caches.delete(k);})))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(e.request.method==='GET'&&res&&res.status===200){const clone=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,clone));}return res;}).catch(()=>caches.match('./'))));});