import {NextRequest} from "next/server";
import {nanoid} from 'nanoid'
import {jwtVerify, SignJWT} from 'jose'
import {JWT_SECRET_KEY} from "./constants";
import prisma from "./prisma";

interface UserJwtPayload {
    jti: string
    iat: number
}

export class AuthError extends Error {
}

export async function generateJWT(userId: number) {
    try {
        return await new SignJWT({'userId': userId})
            .setProtectedHeader({alg: 'HS256'})
            .setJti(nanoid())
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(JWT_SECRET_KEY))
    } catch (e) {
        console.log(e)
    }
    return null
}

export async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get('token')
    if (!token) throw new AuthError('Thiếu token')

    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET_KEY)
        )
        return verified.payload.userId as number;
    } catch (err) {
        throw new AuthError('Token không hợp lệ')
    }
}

// get the user id from the token
export async function getUserId(token: string) {
    const verified = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET_KEY)
    )
    return verified.payload.userId as number;
}

//
export async function checkRoleById(userId: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (user) {
        return user.role;
    }
    return null;
}