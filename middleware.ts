import {type NextRequest, NextResponse} from 'next/server'
import { verifyAuth} from "./lib/auth";
import {wrapper} from "./state";

export async function middleware(req: NextRequest) {
    try {
        const role = await verifyAuth(req);
        // get cookie
        const token = req.cookies.get('token');
        let rolez = await fetch('http://localhost:3000/api/user/get-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        rolez = await rolez.json();
        // if null or undefined
        if (!rolez) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        if (req.url.includes('admin')) {
            if (rolez.role !== 'admin') {
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
        return NextResponse.next();
    } catch (e) {
        console.log(e);
    }
    return NextResponse.redirect(new URL('/login', req.url));

}

export const config = {
    matcher: ['/api/user/:path*', '/api/admin/:path*'],
}