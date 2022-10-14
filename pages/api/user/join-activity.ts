import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";
import {getCookie} from "cookies-next";
import {getUserId} from "../../../lib/auth";

export default async function handle(
    // test
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {id} = req.body;
    const token = getCookie('token', {req});
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    const userId = await getUserId(token.toString());
    prisma.joinactivity.create({
        data: {
            activityId: Number(id),
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }).then((_joinActivity) => {
        if (_joinActivity) {
            res.status(200).json({
                message: "Tham gia hoạt động thành công",
            })
        } else {
            res.status(400).json({
                message: "Tham gia hoạt động thất bại",
            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    })


}