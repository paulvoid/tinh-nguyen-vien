import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../lib/prisma'


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const activities = await prisma.activity.findMany({
        where: {
            status: "PUBLISHED"
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    // count number of user join activity
    const activitiesWithCount = await Promise.all(activities.map(async (activity) => {
        const count = await prisma.joinactivity.count({
            where: {
                activityId: activity.id
            }
        })
        return {
            ...activity,
            count: count
        }
    }))
    res.status(200).json(activitiesWithCount)
}


