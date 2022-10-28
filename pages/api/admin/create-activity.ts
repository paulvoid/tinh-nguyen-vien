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

    const {name, content, startDate, endDate, location} = req.body;
    let createdAt = new Date();
    let updatedAt = new Date();
    let startDateActivity = new Date(startDate);
    let endDateActivity = new Date(endDate);
    const token = getCookie('token', {req});
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    prisma.activity.create({
        data: {
            name: name,
            content: content,
            startDate: startDateActivity,
            endDate: endDateActivity,
            createdAt: createdAt,
            updatedAt: updatedAt,
            location: location,
        }
    }).then((_activity) => {
        if (_activity) {
            res.status(200).json({
                message: "Tạo hoạt động thành công",
            })
            return;
        } else {
            res.status(400).json({
                message: "Tạo hoạt động thất bại",
            })
            return;
        }
    }).catch((_err) => {
        console.log(_err);
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
        return;
    })

}
