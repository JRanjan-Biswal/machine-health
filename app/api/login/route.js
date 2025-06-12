import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
    let url = process.env.API_URL;

    try {
        const { email, password } = await request.json();
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { success: false, message: errorData.message || 'Invalid credentials' },
                { status: 401 }
            );
        }

        const result = await response.json();

        const cookieStore = await cookies();
        cookieStore.set('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/', // Accessible across your entire site
            sameSite: 'lax', // Or 'strict' for more security, but can break cross-site navigation
        });

        cookieStore.set('email', email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/', // Accessible across your entire site
            sameSite: 'lax', // Or 'strict' for more security, but can break cross-site navigation
        });

        return NextResponse.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error processing login:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );

    }
}