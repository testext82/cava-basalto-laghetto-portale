const CACHE = "cava-basalto-v8";
const ASSETS = ["./","./index.html","./manifest.webmanifest","./og-image.png","./iso-14001.jpg","./icon-192.png","./icon-512.png","./icon-512-maskable.png","./documenti/Linee-Guida-R10.pdf","./documenti/Scheda-Caratterizzazione-RegioneLazio.pdf","./documenti/Verbale-Campionamento-UNI10802-2023.pdf"];
self.addEventListener("install",(e)=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",(e)=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",(e)=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(ca=>{try{ca.put(e.request,cp);}catch(_){}});return r;}).catch(()=>caches.match("./index.html"))));});
