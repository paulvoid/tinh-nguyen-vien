import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";


export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {id} = req.body;

    const activities = await prisma.activity.findFirst({
        where: {
            id: Number(id)
        }
    })
    return prisma.joinactivity.findMany({
        where: {
            AND: [
                {
                    activityId: Number(id)
                },
                {
                    status: "PRESENT"
                }
            ]
        }
    }).then((_joinActivity) => {
        return prisma.user.findMany({
            where: {
                id: {
                    in: _joinActivity.map((item) => item.userId)
                }
            }
        }).then((_user) => {
                res.status(200).json({
                    users: _user
                });
            }
        ).catch((_err) => {
            res.status(400).json({
                message: "Có lỗi xảy ra",
            })
        })
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    })

}


