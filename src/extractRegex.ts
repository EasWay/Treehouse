import fs from 'fs';

const html = fs.readFileSync('tmp_cards.txt', 'utf-8');

const regex = /https:\/\/lh[0-9]*\.googleusercontent\.com\/p\/[a-zA-Z0-9_\-]+/g;
const matches = html.match(regex);
if (matches) {
    const unique = Array.from(new Set(matches));
    console.log("Found image count:", unique.length);
    fs.writeFileSync('images.json', JSON.stringify(unique, null, 2));
}

// let's grab some metadata like reviews or name
const metaMatch = html.match(/"([^"]*Treehouse[^"]*)"/g);
if (metaMatch) {
    fs.writeFileSync('meta.json', JSON.stringify(metaMatch.slice(0, 50), null, 2));
}

const resArrayMatch = html.match(/\["Treehouse Restaurant",/g);
console.log("Found Treehouse:", resArrayMatch?.length);
