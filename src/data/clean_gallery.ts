import * as fs from 'fs';
import * as path from 'path';

const files = [
  'Paste April 30, 2026 - 8_36PM.txt',
  'Paste April 30, 2026 - 8_37PM.txt',
  'Paste April 30, 2026 - 8_38PM.txt'
];

const allUrls = new Set<string>();

files.forEach(file => {
  const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8');
  const urls = content.match(/https?:\/\/[^\s"]+/g) || [];
  urls.forEach(url => allUrls.add(url));
});

const cleanedUrls = Array.from(allUrls).filter(url => {
  // Filter for high quality images
  if (!url.includes('googleusercontent.com') && !url.includes('googleapis.com')) return false;
  
  // Remove known non-gallery items
  if (url.includes('ogw/')) return false; // Profile pics
  if (url.includes('ssl.gstatic.com')) return false;
  if (url.includes('www.gstatic.com')) return false;
  if (url.includes('nav_logo')) return false;
  if (url.includes('email_grey600')) return false;
  if (url.includes('loading_24.gif')) return false;
  if (url.includes('RotateCookiesPage')) return false;
  if (url.includes('accounts.google.com')) return false;
  if (url.includes('ogs.google.com')) return false;
  
  return true;
}).map(url => {
  // Normalize Google Photos/Maps URLs to high resolution
  // If it has a parameter like =wXXX-hYYY... or =sXXX
  if (url.includes('googleusercontent.com')) {
    // Replace the end parameter with a high-res one
    // Look for patterns like =w... =s...
    const base = url.split('=')[0];
    return `${base}=s2000`; // Standard high-res parameter for Google images
  }
  return url;
});

// Remove duplicates after normalization
const finalUrls = Array.from(new Set(cleanedUrls));

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/gallery.json'),
  JSON.stringify(finalUrls, null, 2)
);

console.log(`Cleaned ${finalUrls.length} image URLs.`);
