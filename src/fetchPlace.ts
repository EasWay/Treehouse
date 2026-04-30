import https from 'https';
import fs from 'fs';

const html = fs.readFileSync('tmp_cards.txt', 'utf-8');
const match = html.match(/<link href="(\/maps\/preview\/place\?[^"]+)"/);

if (match && match[1]) {
    const url = 'https://www.google.co.uk' + match[1].replace(/&amp;/g, '&');
    console.log("Fetching url:", url);
    
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" }}, (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
            fs.writeFileSync('place_data.js', body);
            console.log("Saved place_data.js length:", body.length);
            
            // Extract image URLs
            const urls = body.match(/https:\/\/[a-zA-Z0-9.\-]+\/p\/[a-zA-Z0-9_\-]+/g);
            if (urls) {
                const unique = Array.from(new Set(urls));
                console.log("Images found:", unique.length);
                fs.writeFileSync('images.json', JSON.stringify(unique, null, 2));
            }
            
            // Extract sentences and reviews
            const words = body.match(/"([^"]{30,})"/g);
            if (words) {
                fs.writeFileSync('words.json', JSON.stringify(words, null, 2));
            }
        });
    });
} else {
    console.log("No place url found");
}
