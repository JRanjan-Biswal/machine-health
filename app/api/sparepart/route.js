import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    let url = process.env.API_URL;
    try {
        const cookieStore = await cookies();

        const currentcookie = cookieStore.get('token').value.trim();

        const response = await fetch(`${url}/machines/684362214978c14755e02860/spare-parts/68436859af3221a4b1df84f1`, {
            headers: {
                authorization: `Bearer ${currentcookie}`, // Assuming you have an API token for authentication
            },
        });

        const sparePartResponse = await fetch(`${url}/spare-part-photos/684362214978c14755e02860/68436859af3221a4b1df84f1`, {
            headers: {
                authorization: `Bearer ${currentcookie}`, // Assuming you have an API token for authentication
            },
        });

        if (!response.ok  || !sparePartResponse.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { success: false, message: errorData.message || 'Invalid credentials' },
                { status: 401 }
            );
        }

        const data = await response.json();
        const sparePartData = await sparePartResponse.json();
        // TODO: Add your logic to handle the data, e.g., save to database

        return NextResponse.json({ message: 'Spare part created successfully', data, sparePartData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create spare part', details: error.message }, { status: 500 });
    }
}