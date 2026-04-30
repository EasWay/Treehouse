import https from 'https';

https.get('https://maps.app.goo.gl/ffXgKPvFvyK4BjrS6?g_st=ac', (res) => {
    console.log("Redirect URL:", res.headers.location);
});
