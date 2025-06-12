import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    try {
        const { subject, htmlContent, cc } = await req.json();

        const msg = {
            to: process.env.SENDGRID_TO_EMAIL,
            from: process.env.SENDGRID_FROM_EMAIL, // This should be your verified sender
            subject,
            html: htmlContent,
            cc: [process.env.SENDGRID_CC_EMAIL]
        };

        await sgMail.send(msg);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error.code);
        return NextResponse.json(
            { error: 'Failed to send email', data: error },
            { status: error?.code || 500 }
        );
    }
}
