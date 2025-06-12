import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
    let url = process.env.API_URL;

    try {
        const cookieStore = await cookies();
        const currentcookie = cookieStore.get('token').value.trim();

        // Get the form data from the request
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Create a new FormData instance for the API request
        const apiFormData = new FormData();
        apiFormData.append('profilePicture', file);

        const response = await fetch(`${url}/upload/profile-picture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${currentcookie}`,
            },
            body: apiFormData,
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: 'Failed to upload profile picture', backendError: response.message },
                { status: response.status || 400 }
            );
        }

        const result = await response.json();

        return NextResponse.json({ 
            success: true, 
            message: 'Profile picture uploaded successfully', 
            backendData: result 
        });
        
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error', backendError: error },
            { status: 500 }
        );
    }
}