import { type NextRequest, NextResponse } from 'next/server'

import { getCookie } from 'cookies-next';
import * as Url from "url";
import {verifyAuth} from "./lib/auth";

export async function middleware(req: NextRequest) {
    let cookie = req.cookies.get('token');
    try {
        await verifyAuth(req);
        return NextResponse.next();
    }
    catch (e) {
        //console.log(e);
    }
    return NextResponse.redirect(new URL('/login', req.url));

}

export const config = {
    matcher: ['/api/user/:path*'],
}