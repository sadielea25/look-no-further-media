import { Resend } from 'resend';

const resend = new Resend('re_hnQkrYut_Hf2edc5cTGAKQ6qodnSYjy7t');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { full_name, email, business_stage, marketing_challenge } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Look No Further <onboarding@resend.dev>',
      to: ['sadielea25@gmail.com'], // Updated to account-verified email for testing
      subject: `New Lead: ${full_name} (${business_stage})`,
      html: `
        <h2>New Lead from The Machine</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Stage:</strong> ${business_stage}</p>
        <p><strong>Challenge:</strong> ${marketing_challenge}</p>
        <hr>
        <p>This lead has also been saved to your Supabase database.</p>
      `
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
