// /Users/xiabai/p/src/pages/api/gpt4.ts

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'sk-proj-0KZJu1d2ah9d7s6aVm5xT3BlbkFJRA3FFy9QHNeGyhNQjGej',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    res.status(200).json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Error details:', error); // Log error details to console
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
