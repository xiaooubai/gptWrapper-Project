// pages/api/sendMessage.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { userMessage } = req.body;

    try {
      const response = await fetch(
        'https://api.mistral.ai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer cJUndyEQgmjDdHnVtEJU4Ko0BXn0HPAY', // Securely use the API key
          },
          body: JSON.stringify({
            model: 'mistral-large-latest',
            messages: [{ role: 'user', content: userMessage }],
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        const botMessage = data.choices[0].message.content;
        res.status(200).json({ botMessage });
      } else {
        throw new Error('Failed to fetch from the AI API');
      }
    } catch (error: unknown) {
      res.status(500).json({ error: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
