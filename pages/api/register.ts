import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../lib/prisma'
import {v4 as uuidv4} from 'uuid'
import { hash} from 'bcrypt';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    const { name,password,email } = req.body;
    // generate a random uuid
    let identifier = uuidv4();
    let passwordHash : string = await hash(password, 10);
    prisma.user.create({
        data: {
            name,
            identifier,
            email,
            password: passwordHash,
            role: "user",
        }
    }).then((_user) => {
        res.status(200).json({
            message: "User created successfully",
        })
    }).catch((_err) => {
        res.status(400).json({
            message: "User not created",
        })
    })
}