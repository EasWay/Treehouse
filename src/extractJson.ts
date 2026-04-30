import fs from 'fs';

const html = fs.readFileSync('tmp_cards.txt', 'utf-8');
const match = html.match(/window\.APP_INITIALIZATION_STATE=(.*?)<\/script>/);

if (match && match[1]) {
    try {
        let jsonStr = match[1];
        // It might end with a semicolon or something
        if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
        
        // Let's just find strings starting with https://lh5.googleusercontent.com/p/
        // or https://lh3.googleusercontent.com/p/
        // Actually, if we look at the raw string for https:// it might show us what the image domains are
        
        const urls = jsonStr.match(/https:\/\/[^"]+/g);
        if (urls) {
            const photos = urls.filter(u => u.includes('lh3.googleusercontent.com/p/') || u.includes('lh5.googleusercontent.com/p/') || u.includes('ggpht.com/p/'));
            console.log("Photos found:", new Set(photos).size);
            fs.writeFileSync('photos.json', JSON.stringify(Array.from(new Set(photos)), null, 2));
        }

        const rawWords = jsonStr.match(/"([^"]{10,})"/g);
        if (rawWords) {
            fs.writeFileSync('words.json', JSON.stringify(rawWords, null, 2));
        }

    } catch (e) {
        console.error(e);
    }
} else {
    console.log("no match");
}
