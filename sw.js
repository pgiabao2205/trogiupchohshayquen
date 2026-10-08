const C='baohub-v15',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET')return;
if(q.mode=='navigate'){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put('index.html',c));return r}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(q).then(h=>{const n=fetch(q).then(r=>{if(r&&(r.ok||r.type=='opaque')){const c=r.clone();caches.open(C).then(x=>x.put(q,c))}return r}).catch(()=>h||new Response('',{status:504}));return h||n}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>l.length?l[0].focus():self.clients.openWindow('./')))});
