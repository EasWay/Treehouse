import fs from 'fs';

const html = fs.readFileSync('tmp_cards.txt', 'utf-8');
const allImages = html.match(/(https?:\/\/[a-zA-Z0-9.\-]+\/[a-zA-Z0-9_\-\/]+(\.jpg|\.png|\.webp|=w[0-9]+-h[0-9]+[^"]*)+)/ig);

let unique = new Set(allImages || []);
const arr = Array.from(unique);
console.log("Images found in raw HTML:", arr.length);
fs.writeFileSync('all_raw_images.json', JSON.stringify(arr, null, 2));

const allCid = html.match(/0x[a-f0-9]+:0x[a-f0-9]+/ig);
console.log("CIDs:", Array.from(new Set(allCid)));
