import fs from 'fs';
import https from 'https';

const url = 'https://duckduckgo.com/html/?q=Treehouse+Restaurant+Accra+instagram';

https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }}, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
        const matches = body.match(/href="([^"]+instagram\.com[^"]+)"/g);
        console.log("Instagram links found in DDG:", matches);
    });
});
