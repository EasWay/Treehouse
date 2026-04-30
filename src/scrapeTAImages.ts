import fs from 'fs';
import https from 'https';

const q = 'Treehouse+Restaurant+Accra+interior+exterior+food';
const url = `https://html.duckduckgo.com/html/?q=${q}`;

// Let's just use duckduckgo HTML and pull image URLs directly from the HTML source if available.
// Actually duckduckgo HTML search doesn't show images tab directly.

// What if we scrape TripAdvisor images?
const taUrl = 'https://www.tripadvisor.com/Restaurant_Review-g297628-d23204996-Reviews-Treehouse_Restaurant-Accra_Greater_Accra.html';

https.get(taUrl, { headers: { 
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}}, (res) => {
    let body = '';
    res.on('data', c => body += c);
    res.on('end', () => {
        fs.writeFileSync('ta.html', body);
        const matches = body.match(/https:\/\/media-cdn\.tripadvisor\.com\/media\/photo[a-zA-Z0-9_\-\/.]+/g);
        const unique = Array.from(new Set(matches || []));
        console.log("TripAdvisor Images found:", unique.length);
        fs.writeFileSync('ta_images.json', JSON.stringify(unique, null, 2));
    });
});
