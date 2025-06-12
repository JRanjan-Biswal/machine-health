import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    let url = process.env.API_URL;

    try {
        const cookieStore = await cookies();

        const currentcookie = cookieStore.get('token').value.trim();

        const { email, name, designation, phone } = await request.json();
        const response = await fetch(`${url}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${currentcookie}`, // Assuming you have an API token for authentication
            },
            body: JSON.stringify({ email, name, designation, phone }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: response.message || 'user not found' },
                { status: response.status || 400 }
            );
        }

        const result = await response.json();

        return NextResponse.json({ success: true, message: 'user data modified successfully', backendData: result });
        
    } catch (error) {
        console.error('Error processing login:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error', backendError: error },
            { status: 500 }
        );

    }
}