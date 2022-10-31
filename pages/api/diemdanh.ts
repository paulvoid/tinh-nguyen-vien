import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../lib/prisma'

/*enum DiemDanhStatus {
    NOT_YET
    PRESENT
    ABSENT
    LATE
}*/
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {slug, identifier} = req.body;
    const checkActivity = await prisma.activity.findFirst({
        where: {
            AND: [
                {
                    slug: slug
                },
                {
                    status: "PUBLISHED"
                },
                {
                    // check time now is between start time and end time
                    startDate: {
                        lte: new Date()
                    }
                },
                {
                    endDate: {
                        gte: new Date()
                    }
                },
            ]
        }
    })
    if (checkActivity) {
        // check user available
        prisma.user.findFirst({
            where: {
                identifier: identifier
            }
        }).then((_user) => {
            if (_user) {
                // check user join activity
                prisma.joinactivity.findFirst({
                    where: {
                        AND: [
                            {
                                activityId: checkActivity.id
                            },
                            {
                                userId: _user.id
                            }
                        ]
                    }
                }).then((_joinActivity) => {
                    if (_joinActivity) {
                        if (_joinActivity.status === "PRESENT" || _joinActivity.status === "LATE") {
                            res.status(400).json({
                                message: "Bạn đã điểm danh rồi"
                            })
                        } else {
                            prisma.joinactivity.update({
                                where: {
                                    id: _joinActivity.id
                                },
                                data: {
                                    status: "PRESENT"
                                }
                            }).then((_joinActivity) => {
                                if (_joinActivity) {
                                    res.status(200).json({
                                        message: "Điểm danh thành công"
                                    })
                                } else {
                                    res.status(400).json({
                                        message: "Điểm danh thất bại"
                                    })
                                }
                            }).catch((_err) => {
                                res.status(400).json({
                                    message: "Có lỗi xảy ra"
                                })
                            })
                        }
                    }
                    else {
                        res.status(400).json({
                            message: "Bạn không tham gia hoạt động này"
                        })
                    }


                })
            } else {
                res.status(400).json({
                    message: "Không tìm thấy người dùng"
                })

            }
        })

    } else {
        res.status(400).json({
            message: "Không tìm thấy hoạt động"
        })
    }
}