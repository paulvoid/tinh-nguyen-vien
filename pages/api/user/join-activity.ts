import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";
import {getCookie} from "cookies-next";
import {getUserId} from "../../../lib/auth";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        res.status(400).json({
            message: "Không hỗ trợ phương thức GET",
        })
    }
    const {id} = req.body;
    const token = getCookie('token', {req});
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    const userId = await getUserId(token.toString());
    const checkJoined = await prisma.joinactivity.findFirst({
        where: {
            userId: userId,
            activityId: id
        }
    })
    if (checkJoined) {
        res.status(400).json({
            message: "Bạn đã đăng ký hoạt động này rồi",
        })
        return;
    }
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
                message: "Đăng ký tham gia thành công",
            })
        } else {
            res.status(400).json({
                message: "Đăng ký tham gia thất bại",
            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
        console.log(_err)
    })


}