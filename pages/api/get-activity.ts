import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../lib/prisma'
import {getCookie} from "cookies-next";
import {Buffer} from "buffer";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        res.status(400).json({
            message: "Không hỗ trợ phương thức GET",
        })
    }
    const {slug} = req.body;

    prisma.activity.findFirst({
        where: {
            AND: [
                {
                    slug: slug
                },
                {
                    status: "PUBLISHED"
                }
            ]
        },
        select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            status: true,
            slug: true,
        }
    }).then((_activity) => {
        if (_activity) {
            res.status(200).json({
                message: "Lấy hoạt động thành công",
                activity: _activity
            })
        } else {
            res.status(400).json({
                message: "Lấy hoạt động thất bại",
            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    });
}