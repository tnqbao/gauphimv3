import { NextApiRequest, NextApiResponse } from "next";
import { userApiInstance } from "@/utils/axios.config";
import { serialize } from "cookie";
import { getDeviceId } from "@/utils/device";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { email, password, keepLogin } = req.body;
        const shouldKeepLogin = keepLogin === "true" || keepLogin === true;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Use the existing getDeviceId function
        const deviceId = getDeviceId();

        const response = await userApiInstance.post("api/v2/account/basic/login", {
            email: email,
            password,
            keepMeLogin: keepLogin.toString()
        }, {
            headers: {
                "X-Device-ID": deviceId
            }
        });

        if (response.status !== 200) {
            return res.status(response.status).json({ message: response.data.message || "Login failed" });
        }

        const { access_token, refresh_token, expires_in } = response.data;

        // Set cookies
        res.setHeader("Set-Cookie", [
            serialize("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: shouldKeepLogin ? 60 * 60 * 24 * 7 : undefined, // 7 days
                sameSite: "strict",
                path: "/",
            }),
            serialize("refresh_token", refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: shouldKeepLogin ? 60 * 60 * 24 * 30 : undefined, // 30 days
                sameSite: "strict",
                path: "/",
            }),
        ]);

        // Get user profile
        const userResponse = await userApiInstance.get("api/v2/account/profile/basic", {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        });

        const userInfo = userResponse.data.user_info;

        // Return user info and token in the format expected by the store
        return res.status(200).json({
            access_token,
            refresh_token,
            expires_in,
            user: {
                user_id: userInfo.user_id,
                fullname: userInfo.fullname,
                email: userInfo.email,
                permission: userInfo.permission || "member",
                is_email_verified: userInfo.is_email_verified,
                is_phone_verified: userInfo.is_phone_verified,
                date_of_birth: userInfo.date_of_birth,
            },
            device_id : deviceId
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(401).json({ message: "Invalid email or password" });
    }
}
