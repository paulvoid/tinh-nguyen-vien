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
    const {id, name, content, startDate, endDate, location} = req.body;
    let startDateActivity = new Date(startDate);
    let endDateActivity = new Date(endDate);
    let updatedAt = new Date();
    const token = getCookie('token', {req});
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    prisma.activity.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name,
            content: content,
            startDate: startDateActivity,
            endDate: endDateActivity,
            updatedAt: updatedAt,
            location: location,
        }
    }).then((_activity) => {
        if (_activity) {
            res.status(200).json({
                message: "Cập nhật hoạt động thành công",
            })
        } else {
            res.status(400).json({
                message: "Cập nhật hoạt động thất bại",
            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
        console.log(_err);
    })

}
