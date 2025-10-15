import { NextApiRequest, NextApiResponse } from "next";
import { userApiInstance } from "@/utils/axios.config";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { email, password, keepLogin, deviceId } = req.body;
        const shouldKeepLogin = keepLogin === "true";
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Step 1: Login to get access token
        const loginResponse = await userApiInstance.post("api/v2/account/basic/login", {
            email: email,
            password,
            keepMeLogin: keepLogin.toString()
        }, {
            headers: {
                "Content-Type": "application/json",
                "X-Device-ID": deviceId || ""
            }
        });

        if (loginResponse.status !== 200) {
            return res.status(loginResponse.status).json({ message: loginResponse.data });
        }

        const { access_token } = loginResponse.data;

        // Step 2: Get user profile using access token
        let user = null;
        try {
            const profileResponse = await userApiInstance.get("/api/v2/account/profile/basic", {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                    "X-Device-ID": deviceId || ""
                }
            });

            if (profileResponse.status === 200 && profileResponse.data.user_info) {
                const userInfo = profileResponse.data.user_info;
                user = {
                    user_id: userInfo.user_id,
                    fullname: userInfo.fullname,
                    email: userInfo.email,
                    permission: "member" // Default permission, adjust as needed
                };
            }
        } catch (profileError) {
            console.error("Profile fetch error:", profileError);
        }

        res.setHeader(
            "Set-Cookie",
            serialize("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: shouldKeepLogin ? 60 * 60 * 24 * 7 : undefined,
                sameSite: "strict",
                path: "/",
            })
        );

        return res.status(200).json({ access_token, user });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(401).json({ message: "Invalid email or password" });
    }
}
