import {type NextRequest, NextResponse} from 'next/server'
import {checkRole, verifyAuth} from "./lib/auth";

export async function middleware(req: NextRequest) {
    try {
        const role = await verifyAuth(req);

        if (req.url.includes('admin')) {
            console.log(role);
            if (role !== 'admin') {
                return NextResponse.redirect('/login');
            }
        }
        return NextResponse.next();
    } catch (e) {
        console.log(e);
    }
    console.log("ROLE: " + "USER")
    return NextResponse.redirect(new URL('/login', req.url));

}

export const config = {
    matcher: ['/api/user/:path*', '/api/admin/:path*'],
}