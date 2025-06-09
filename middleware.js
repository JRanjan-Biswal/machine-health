// middleware.ts
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/']; // Add any other public routes

export async function middleware(request) {
    console.log('Middleware triggered for:', request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next(); // Allow access to public routes
  }

  // 1. Get the token from the cookie
  const token = request.cookies.get('token')?.value;

  // 2. Check if the token exists and is valid (optional, but recommended for more robust security)
  //    In a real application, you might decode a JWT here or make an API call to your backend
  //    to validate the token against your database/authentication service.
  const isAuthenticated = !!token; // Basic check: just presence of token

  // If no token or invalid token, redirect to login
  if (!isAuthenticated) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('redirect', pathname); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
// This matcher ensures the middleware doesn't run on internal Next.js paths or static files.
export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.css$|.*\\.js$|.*\\.map$).*)'],
};