import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Tạm thời disable logic check status - luôn trả về authenticated = false
    return res.status(401).json({ authenticated: false });

    // Code cũ được comment lại
    /*
    import { parse } from "cookie";
    import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

    const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

    try {
        const cookies = parse(req.headers.cookie || "");
        if (!cookies.access_token) {
            return res.status(401).json({ authenticated: false });
        }

        const decoded = jwt.verify(cookies.access_token, SECRET_KEY) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.user_id || !decoded.fullname || !decoded.permission) {
            return res.status(401).json({ authenticated: false, message: "Invalid token structure" });
        }

        return res.status(200).json({ authenticated: true, user: decoded });

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            console.log(error);
            return res.status(401).json({ authenticated: false, message: "Token expired" });
        }

        console.error("JWT Error:", error);
        return res.status(401).json({ authenticated: false, message: "Invalid token" });
    }
    */
}
