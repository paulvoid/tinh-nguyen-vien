import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";
import {getCookie} from "cookies-next";


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
    prisma.activity.delete({
        where: {
            id: Number(id)

        }
    }).then((_activity) => {
        if (_activity) {
            res.status(200).json({
                message: "Xóa hoạt động thành công",
            })
        } else {
            res.status(400).json({
                message: "Xóa hoạt động thất bại",
            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    })
}
