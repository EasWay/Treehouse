const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
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
        
        // Extract window.APP_INITIALIZATION_STATE
        const match = html.match(/window\.APP_INITIALIZATION_STATE=(.*?)<\/script>/);
        if (match && match[1]) {
            console.log("Found APP_INITIALIZATION_STATE!");
            // The JSON might have some trailing code, so let's carefully parse or regex out the image URLs at least
            const str = match[1];
            // Just regex out URLs ending in .jpg or with lh5.googleusercontent.com
            const imageMatch = Array.from(new Set(str.match(/https:\/\/(lh3|lh4|lh5|lh6)\.googleusercontent\.com\/p\/[a-zA-Z0-9_\-]+/g)));
            console.log("Found Images:", imageMatch.length);
            console.log(imageMatch.slice(0, 10));

            // See if we can find video URLs, menu, text, etc.
             const reviews = Array.from(new Set(str.match(/"([^"]+? \([0-9]+ (months|weeks|days|years) ago\).*?)"/g)));
             console.log("Reviews?:", reviews.slice(0, 5));

            require('fs').writeFileSync('scraped_data.json', JSON.stringify({
                images: imageMatch
            }, null, 2));

            // dump to a text file to grep more things
            require('fs').writeFileSync('tmp_maps.txt', str);
        } else {
             console.log("Could not find APP_INITIALIZATION_STATE. Try logging HTML parts.");
             require('fs').writeFileSync('tmp_html.txt', html);
        }
    } catch(e) {
        console.error(e);
    }
})();
