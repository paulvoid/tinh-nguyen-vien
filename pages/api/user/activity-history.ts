import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";
import {getCookie} from "cookies-next";
import {getUserId} from "../../../lib/auth";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        res.status(400).json({
            message: "Không hỗ trợ phương thức POST",
        })
    }
    const token = getCookie('token', {req});
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    const userId = await getUserId(token.toString());
    prisma.joinactivity.groupBy({
        by: ['activityId'],
        where: {
            userId: userId
        }
    }).then((_joinActivity) => {
        prisma.activity.findMany({
            where: {
                id: {
                    in: _joinActivity.map((item) => item.activityId)
                }
            }
        }).then((_activity) => {
            res.status(200).json(_activity);
        }).catch((_err) => {
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