import type { VercelRequest, VercelResponse } from '@vercel/node';
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ ok: true, mode: process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL ? 'live' : 'mock' });
}
