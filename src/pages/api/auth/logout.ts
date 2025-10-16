import { NextApiRequest, NextApiResponse } from "next";
import { userApiInstance } from "@/utils/axios.config";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ status: 405, message: `Method ${req.method} Not Allowed` });
    }

    try {
        // Get access token from cookies or authorization header
        const accessToken =
            req.cookies.access_token ||
            (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
                ? req.headers.authorization.substring(7)
                : null);

        // Call external logout API if token exists
        if (accessToken) {
            try {
                await userApiInstance.post(
                    "/api/user/auth/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            } catch (error) {
                console.error("External logout API error:", error);
                // Continue with local logout even if external API fails
            }
        }

        // Clear both cookies
        res.setHeader("Set-Cookie", [
            serialize("access_token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            }),
            serialize("refresh_token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            }),
        ]);

        return res.status(200).json({ status: 200, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);

        // Even if there's an error, clear the cookies
        res.setHeader("Set-Cookie", [
            serialize("access_token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            }),
            serialize("refresh_token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            }),
        ]);

        return res.status(200).json({ status: 200, message: "Logged out successfully" });
    }
}
