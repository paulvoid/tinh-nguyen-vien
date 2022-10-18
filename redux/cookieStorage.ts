import { getCookie,setCookie } from "cookies-next";
import { decodeJwt } from "jose";
import type { JWTPayload } from "jose";
export const loadState = () => {
    try {
        const serializedState = getCookie('token') as string
        if (serializedState === undefined) {
            return undefined;
        }
        let decodedToken = decodeJwt(serializedState) as JWTPayload;
        let user = decodedToken.userId as number;
        const auth = {
            isLoggedIn: true,
            user: user,
            accessToken: serializedState
        }
        return auth;
    } catch (err) {
        return undefined;
    }
}

export const saveState = (token : string) => {
    try {
        setCookie('token', token, { maxAge: 60 * 60 * 24 });
    } catch {
        // ignore write errors
    }
}