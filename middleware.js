// middleware.js
// This file is used by Vercel for Edge Middleware.
// Since this project is not using Next.js, we use the standard Web Response API.

export default function middleware(request) {
  return new Response('This project has been paused by Alpha Group LLC. For more information, please contact 0247173819', {
    status: 503,
    headers: { 
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
    }
  });
}
