import {type NextRequest, NextResponse} from 'next/server'
import {checkRoleById, verifyAuth} from "./lib/auth";

export async function middleware(req: NextRequest) {
    try {
        const userId = await verifyAuth(req);
        // if role is admin
        // if url contains admin
        if (req.url.includes('admin')) {
            if (await checkRoleById(userId) === 'admin') {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(new URL('/404', req.url));
            }
        }
        return NextResponse.next();
    } catch (e) {
        //console.log(e);
    }
    return NextResponse.redirect(new URL('/login', req.url));

}

export const config = {
    matcher: ['/api/user/:path*', '/api/admin/:path*'],
}