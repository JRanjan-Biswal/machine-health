import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    let url = process.env.API_URL;
    const cookieStore = await cookies();
    const loggedInUserEmail = cookieStore.get('email').value.trim();
    const currentcookie = cookieStore.get('token').value.trim();
    try {
        const allUserResponse = await fetch(`${url}/user`, {
            headers: {
                Authorization: `Bearer ${currentcookie}`
            }
        });

        if (!allUserResponse.ok) {
            throw notFound();
        }

        const allUserResult = await allUserResponse.json();
        const allUserResultData = allUserResult?.users;

        const loggedInUser = allUserResultData?.filter(user => user.email.toLowerCase() == loggedInUserEmail.toLowerCase());

        return NextResponse.json({ message: 'get logged in users', data: loggedInUser?.[0] }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'failer to return logged in user', details: error.message }, { status: 500 });
    }
}