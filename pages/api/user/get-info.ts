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
    if (!userId) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    prisma.user.findFirst({
        where: {
            id: userId
        }
    }).then((_user) => {
        if (_user) {
            res.status(200).json({
                name: _user.name,
                email: _user.email,
                identifier: _user.identifier,
                role: _user.role,

            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    })

}