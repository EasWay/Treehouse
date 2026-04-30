import fs from 'fs';
import https from 'https';
import querystring from 'querystring';

const q = querystring.escape('Treehouse Restaurant Accra interior exterior food');
const url = `https://html.duckduckgo.com/html/?q=${q}`;

https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }}, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
        // Find vqd
        const vqdMatch = body.match(/vqd='([^']+)'/);
        if (vqdMatch) {
            const vqd = vqdMatch[1];
            // Now search images
            const imgUrl = `https://duckduckgo.com/i.js?q=${q}&o=json&vqd=${vqd}`;
            https.get(imgUrl, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }}, (res2) => {
                let imgBody = '';
                res2.on('data', c => imgBody += c);
                res2.on('end', () => {
                    try {
                        const json = JSON.parse(imgBody);
                        const urls = json.results.map((r: any) => r.image);
                        console.log("Found duckduckgo images:", urls.length);
                        fs.writeFileSync('ddg_images.json', JSON.stringify(urls, null, 2));
                    } catch(e) {
                         console.error("error parsing", e.message);
                    }
                });
            });
        } else {
            console.log("No vqd found, duckduckgo html body length:", body.length);
        }
    });
});
