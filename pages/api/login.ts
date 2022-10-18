import type {NextApiRequest,NextApiResponse} from 'next'
import prisma from '../../lib/prisma'
import {compare} from 'bcrypt';
import {generateJWT} from "../../lib/auth";

import {setCookie} from "cookies-next";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    try{
        const { email,password } = req.body;
        // validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: 'Mật khẩu hoặc email không hợp lệ' });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(!user){
            res.status(400).json({
                message: "Người dùng không tồn tại",
            })
        }else {
            const passwordMatch = await compare(password, user.password);
            const jwt = await generateJWT(user.id);
            if(passwordMatch){
                setCookie('token', jwt, { req, res, maxAge: 60 * 60 * 24 });
                res.status(200).json({
                    message: "Đăng nhập thành công",
                    user: user
                })
            }else {
                res.status(400).json({
                    message: "Mật khẩu không đúng",
                })
            }
        }
    } catch (error) {
        console.log(error);
    }


}