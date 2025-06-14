import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(request) {

    let url = process.env.API_URL;

    try {
        const cookieStore = await cookies();

        const currentcookie = cookieStore.get('token').value.trim();

        const allPassword = await request.json();

        const oldPassword = allPassword?.oldPassword;
        const newPassword = allPassword?.newPassword;
        const confirmPassword = allPassword?.confirmPassword;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return NextResponse.json(
                { success: false, message: 'all fields are required' },
                { status: 400 }
            );
        }

        if (newPassword !== confirmPassword) {
            return NextResponse.json(
                { success: false, message: 'new password and confirm password do not match' },
                { status: 400 }
            );
        }

        if (oldPassword === newPassword) {
            return NextResponse.json(
                { success: false, message: 'new password and old password cannot be same' },
                { status: 400 }
            );
        }

        const response = await fetch(`${url}/user/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${currentcookie}`, // Assuming you have an API token for authentication
            },
            body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: response.message || 'some error occured while changing password' },
                { status: response.status || 400 }
            );
        }

        const result = await response.json();

        return NextResponse.json({ success: true, message: 'password changed successfully', backendData: result });

    } catch (error) {

        console.error('Error processing login:', error);

        return NextResponse.json(
            { success: false, message: 'Internal server error', backendError: error },
            { status: error.status || 500 }
        );

    }
}