let cacheData = "appv3";
this.addEventListener("install", (event) =>{
    event.waitUntil(
        caches.open(cacheData).then((cache) =>{
           cache.addAll([
            '/static/js/main.chunk.js',
            '/static/js/0.chunk.js',
            '/static/js/bundle.js',
            '/favicon.ico',
            '/static/media/proimg.2ce33dbde4af0a1debda.webp',
            '/static/media/welcome.6cc48a1ebd61a3b3200f.jpeg',
            '/static/media/man.899e9ee1296dce043935.jpg',
            '/static/media/anna.5912ad180d0614413944.png',
            '/static/media/bob.aaa05b11fe388ff91f69.png',
            '/static/media/jack.fa50e113059f8c4c1ec1.jpg',
            '/static/media/smith.9b8afb51635c635db7d2.png',
            '/static/media/ankita.2dfedcfad48225a73908.png',
            '/static/media/whatsBG.f4b196f1bce2137c76a3.png',
            '/index.html',
            '/',
           ]) 
        })
    )
});

this.addEventListener("fetch", (event) =>{
    if(!navigator.onLine)
    {
        event.respondWith(
            caches.match(event.request).then((res) =>{
                if(res)
                {
                    return res;
                }
            })
        )
    }
    
})