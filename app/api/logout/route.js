import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies from next/headers

export async function POST(request) { // Make sure this is an async function
    const cookieStore = await cookies();

    cookieStore.delete('token');
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
}