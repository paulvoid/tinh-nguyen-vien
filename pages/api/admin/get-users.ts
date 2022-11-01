import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";
import {getCookie} from "cookies-next";

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
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            identifier: true,
        }
    }).then((_users) => {
        res.status(200).json({
            message: "Lấy danh sách người dùng thành công",
            users: _users
        })
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    });
}