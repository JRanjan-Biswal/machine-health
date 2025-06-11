import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies from next/headers

export async function GET(request) { // Make sure this is an async function
    (await cookies()).delete('token')
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
}