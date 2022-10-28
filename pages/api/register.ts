import type {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../lib/prisma";
import {nanoid} from "nanoid";
import {hash} from "bcrypt";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        name,
        password,
        email,
        dateOfBirth,
        phoneNumber,
        address,
        indentifyCard,
        dateOfIssue,
        placeOfIssue,
        unit
    } = req.body;
    let dateOfBirthDate = new Date(dateOfBirth);
    let dateOfIssueDate = new Date(dateOfIssue);
    // generate a random uuid
    let identifier = "TST" + "-" + nanoid(7);
    while (await prisma.user.findMany({
        where: {
            identifier: identifier
        }
    })) {
        identifier = "TST" + "-" + nanoid(7);
    }

    let passwordHash: string = await hash(password, 10);
    const alreadyExists = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (alreadyExists) {
        res.status(400).json({
            message: "Người dùng đã tồn tại",
        });
    } else {
        prisma.user
            .create({
                data: {
                    name,
                    identifier,
                    email,
                    password: passwordHash,
                    role: "user",
                    dateOfBirth: dateOfBirthDate,
                    phoneNumber,
                    address,
                    indentifyCard,
                    dateOfIssue: dateOfIssueDate,
                    placeOfIssue,
                    unit
                },
            })
            .then((_user) => {
                if (_user) {
                    res.status(200).json({
                        message: "Người dùng đăng ký thành công",
                    });
                }
            })
            .catch((_err) => {
                console.log(_err);
                res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            });
    }
}
