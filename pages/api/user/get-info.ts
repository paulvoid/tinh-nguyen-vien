import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";
import {generateJWT} from "../../../lib/auth";
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
    // bearer token
    let token = req.headers.authorization;
    // remove bearer
    token = token?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    const userId = await getUserId(token.toString());
    if (!userId) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    return prisma.user.findFirst({
        where: {
            id: userId
        }
    }).then(async (_user) => {
        if (_user) {
            const jwt = await generateJWT(_user.id, _user.role, _user.name);
            res.status(200).json({
                name: _user.name,
                email: _user.email,
                identifier: _user.identifier,
                role: _user.role,
                accessToken: jwt

            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Có lỗi xảy ra",
        })
    })

}