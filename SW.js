importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.precaching.precacheAndRoute([
    'index.html',
    'offline.html',
    'promociones.html',
    'contacto.html',
    'img/offline.jpg',
]);

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.NetworkOnly()
    );

    /*
    workbox.routing.registerRoute(
        ({request}) => request.destination === 'document',
        new workbox.strategies.CacheFirst()
    );

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'document',
        new workbox.strategies.CacheOnly()
    ); */
    workbox.routing.registerRoute(
        ({request}) => request.destination === 'document',
        new workbox.strategies.NetworkFirst()
    );

    //Si hay una respuesta que genere error
    workbox.routing.setCatchHandler(async context=>{
        console.log("entro");
        console.log(context);
        console.log(context.request);
        // Return the recached offline page if a document is being request
        // If (/()){}
        if (context.request.destination === 'image'){
            return workbox.precaching.matchPrecache('img/offline.jpg');}
        else if (context.request.destination === 'document') {
                return workbox.precaching.matchPrecache('offline.html');
        }
        return Response.error();
    });








// var cacheName ='appV1';
// var contenidoCache=[
//     'index.html',
//     'nosotros.html',
//     'galeria.html',
//     'app.js',
//     'sw.js',
//     'manifest.webmanifest',
//     'css/bootstrap.min.css',
//     'js/bootstrap.min.js',
// ];

// self.addEventListener('install', (e)=>{
//     console.log("instaldo");
//     e.waitUntil((async()=>{
//         const cache = await caches.open(cacheName);
//         await cache.addAll(contenidoCache);
//     })())
//     });
// self.addEventListener('fetch',(e)=>{
//         e.respondWith((async()=>{
//             const r = await caches.match(e.request);
//             if (r) return r;
//             const response = await fetch(e.request);
//             const cache= await caches.open(cacheName);
//             cache.put(e.request, response.clone());
//             return response;
//     })())
// })


/*var cacheName='appV1';
var contenidoCache=['index.html','promociones.html', 'contacto.html', 'app.js', 'sw.js','manifest.webmanifest','node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 
'style.css', 'style.css.map', 'style.scss', 'img/rei.gif',
'img/a.jpg', 'img/dino.jpg', 'img/gato,jpg', 'img/loki.jpg', 
'img/maid.jpg','img/malefica.jpg','img/prenda.jpg','img/prenda2.jpg',
'img/prenda3.jpg','img/rana.jpg','img/rei.jpg','img/tiburon.jpg'];



/*
self.addEventListener('install',(e)=>{
console.log("Instalado")
e.waitUntil((async()=>{
    const cache=await caches.open(cacheName);
    await cache.addAll(contenidoCache);
})())
});


self.addEventListener('fetch',(e)=>{
    e.respondWith((async()=>{
        const r= await caches.match(e.request);
        if (r) return r;
        const response= await fetch(e.request);
        const cache=await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    })())
});

*

self.addEventListener('install',(e)=>{
    console.log("Instalado")
    e.waitUntil((async()=>{
        const cache=await caches.open(cacheName);
        await cache.addAll(contenidoCache);
    })())
    });
    
    
    self.addEventListener('fetch',(e)=>{
        e.respondWith((async()=>{
            const r= await caches.match(e.request);
            if (r) return r;
            const response= await fetch(e.request);
            const cache=await caches.open(cacheName);
            cache.put(e.request, response.clone());
            return response;
        })())
    });

    */