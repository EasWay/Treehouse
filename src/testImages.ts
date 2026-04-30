import https from 'https';

const u1 = "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpohZ1i6ca4eSWrVDrLfXUlMkiuUKhdG4q6Cr89rdTDuZh5wrmzbFBXU3AaSnpQhZnfQztTWeHh5kMYt_YuuiDtx9oxrb70eMP9QZTAKc83BBJlc-VgAc9YJGkaXZvyGRS4DBCcPbrJWS9=w1200-h800-k-no";
https.get(u1, res => console.log("u1 status:", res.statusCode));

const u2 = "https://lh4.googleusercontent.com/-2wgmPs2uCT8/AAAAAAAAAAI/AAAAAAAAAAA/KNHh6_5cH7E/s1000-p-k-no-ns-nd/photo.jpg";
https.get(u2, res => console.log("u2 status:", res.statusCode));
