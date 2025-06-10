import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    let url = process.env.API_URL;
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            );
        }

        const response = await fetch(`${url}/client`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { success: false, message: errorData.message || 'Failed to fetch clients' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
