import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
  
  console.log("ddd")
  const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/forum(.*)',
  ]);
  
  export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });
  
  export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  };