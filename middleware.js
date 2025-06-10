// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// When user is not logged in and tries to access protected routes redirect to login page
export const DEFAULT_REDIRECT_LOGIN_URL = '/login'

// When user is logged in and tries to access login page redirect to dashboard
export const DEFAULT_REDIRECT_HOME_URL = '/dashboard'

export default withAuth(
    function middleware(req) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
);

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/stock-preparation/:path*",
        "/cost-benefit/:path*",
    ]
};