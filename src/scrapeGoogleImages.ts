import fs from 'fs';
import https from 'https';

const url = 'https://www.google.com/search?q=Treehouse+Restaurant+Accra&tbm=isch';

https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }}, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
        const matches = body.match(/https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:[a-zA-Z0-9_\-]+/g);
        const unique = Array.from(new Set(matches || []));
        console.log("Found image thumbnails:", unique.length);
        fs.writeFileSync('google_images.json', JSON.stringify(unique, null, 2));
    });
});
