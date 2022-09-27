import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import {compare} from 'bcrypt';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { email,password } = req.body;
    prisma.user.findUnique({
        where: {
            email: email
        }
    }).then((user) => {
        if(user){
            compare(password, user.password).then((result) => {
                if(result){
                    res.status(200).json({
                        message: "Người dùng đăng nhập thành công",
                        user: user
                    })
                }else{
                    res.status(400).json({
                        message: "Mật khẩu không đúng",
                    })
                }
            })
        }else{
            res.status(400).json({
                message: "Người dùng không tồn tại",
            })
        }
    }).catch((_err) => {
        res.status(400).json({
            message: "Người dùng không tồn tại",
        })
    })

}