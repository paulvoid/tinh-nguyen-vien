import type {NextApiRequest, NextApiResponse} from 'next'
import {getCookie, setCookie} from "cookies-next";
import {getUserId} from "../../../lib/auth";
// logout
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        res.status(400).json({
            message: "Không hỗ trợ phương thức GET",
        })
    }

    const token = getCookie('token', {req});
    if (!token) {
        res.status(401).json({message: "Không có quyền truy cập"});
        return;
    }
    const userId = await getUserId(token.toString());
    if (userId) {
        setCookie('token', '', {res});
        res.status(200).json({
            message: "Đăng xuất thành công",
        })
    } else {
        res.status(400).json({
            message: "Đăng xuất thất bại",
        })
    }
}
