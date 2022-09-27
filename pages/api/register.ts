import type { NextApiRequest, NextApiResponse } from 'next'




export default function register(req: NextApiRequest, res: NextApiResponse) {
    const { name, email } = req.body;
    res.status(200).json({ name, email });
}
