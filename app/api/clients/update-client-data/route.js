import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    let url = process.env.API_URL;

    try {
        const cookieStore = await cookies();

        const currentcookie = cookieStore.get('token').value.trim();

        const { capacity, fibercost, powercost, dailyrunninghours, clientId } = await request.json();

        const bodyData = {
            "capacity": capacity,
            "fiberCost": {
                "value": fibercost,
                "priceUnit": "EUR",
                "perUnit": "Ton"
            },
            "powerCost": {
                "value": powercost,
                "priceUnit": "EUR",
                "perUnit": "kw"
            },
            "dailyRunningHours": {
                "value": dailyrunninghours,
                "unit": "Hrs"
            }
        };

        const response = await fetch(`${url}/client/${clientId}/machine-data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${currentcookie}`, // Assuming you have an API token for authentication
            },
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, message: response.message || 'line data not found' },
                { status: response.status || 400 }
            );
        }

        const result = await response.json();

        return NextResponse.json({ success: true, message: 'line data modified successfully', backendData: result });

    } catch (error) {
        console.error('Error processing login:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error', backendError: error },
            { status: 500 }
        );

    }
}