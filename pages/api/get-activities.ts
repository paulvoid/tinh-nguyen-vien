import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../lib/prisma'


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const activities = await prisma.activity.findMany();
    res.status(200).json(activities);
}


