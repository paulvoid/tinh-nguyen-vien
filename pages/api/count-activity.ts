import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../lib/prisma'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.body;

    // count join activity
    const countJoinActivity = await prisma.joinactivity.count({
        where: {
            activityId: Number(id)

        }
    })
    res.status(200).json(countJoinActivity);
}