import { Resend } from 'resend';

const resend = new Resend('re_hnQkrYut_Hf2edc5cTGAKQ6qodnSYjy7t');

async function testEmail() {
    try {
        const data = await resend.emails.send({
            from: 'Look No Further <onboarding@resend.dev>',
            to: ['sadielea25@gmail.com'],
            subject: 'Test Email from Look No Further',
            html: '<p>This is a test email to verify the Resend integration.</p>'
        });
        console.log('Email sent successfully:', data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

testEmail();
