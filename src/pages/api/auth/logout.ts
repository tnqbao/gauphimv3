import {NextApiRequest, NextApiResponse} from "next";
import {userApiInstance} from "@/utils/axios.config";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({status: 405, message: `Method ${req.method} Not Allowed`});
    }

    try {
        const accessToken =
            req.cookies.access_token ||
            (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
                ? req.headers.authorization.substring(7)
                : null);
        const refreshToken = req.cookies.refresh_token || null;

        if (!accessToken && !refreshToken) {
            return res.status(400).json({status: 400, message: "No access or refresh token provided"});
        }
        const deviceId = req.headers.device_id;
        if (accessToken) {
            try {
                await userApiInstance.post(
                    "/api/v2/account/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "X-Device-ID": deviceId,
                            "X-Refresh-Token": refreshToken || "",
                        },
                    }
                );
            } catch (error) {
                console.error("External logout API error:", error);
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

        return res.status(200).json({status: 200, message: "Logged out successfully"});
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

        return res.status(200).json({status: 200, message: "Logged out successfully"});
    }
}
