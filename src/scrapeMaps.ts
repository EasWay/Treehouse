import https from 'https';
import fs from 'fs';

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" }}, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = 'https://www.google.com' + loc;
        return resolve(fetchUrl(loc));
      }
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

(async () => {
    try {
        const html = await fetchUrl('https://maps.app.goo.gl/ffXgKPvFvyK4BjrS6?g_st=ac');
        console.log("HTML length:", html.length);
        
        fs.writeFileSync('tmp_cards.txt', html);
        
        // Find URLs of the format https://lh3.googleusercontent.com/p/.....
        const regex = /https:\/\/lh[0-9]*\.googleusercontent\.com\/p\/[a-zA-Z0-9_\-]+/g;
        const matches = html.match(regex);
        if (matches) {
            const unique = Array.from(new Set(matches));
            console.log("Found image count:", unique.length);
            fs.writeFileSync('images.json', JSON.stringify(unique, null, 2));
        }

        // Also, match for base64 strings or menu images if we can, but let's stick to LH URLs.
        // What about video? Try .mp4
        const m4match = html.match(/(https:\/\/[^"]+\.mp4[^"]*)/g);
        if (m4match) {
            console.log("Found mp4 count:", m4match.length);
            fs.writeFileSync('videos.json', JSON.stringify(m4match, null, 2)); 
        }

    } catch(e) {
        console.error(e);
    }
})();
