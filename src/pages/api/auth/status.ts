import {NextApiRequest, NextApiResponse} from "next";
import {getDeviceId} from "@/utils/device";
import {userApiInstance} from "@/utils/axios.config";

// Utility function to get access token from cookies or localStorage (client-side)
function getAccessToken(req: NextApiRequest): string | null {
    // Check cookies first
    const cookieToken = req.cookies.access_token;
    if (cookieToken) return cookieToken;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    const PRIVATE_KEY = process.env.PRIVATE_KEY;

    if (!PRIVATE_KEY) {
        return res.status(500).json({
            authenticated: false,
            error: 'Server configuration error'
        });
    }

    try {
        const accessToken = getAccessToken(req);

        if (!accessToken) {
            return res.status(200).json({
                authenticated: false,
                message: 'No access token found'
            });
        }

        try {
            const validateResponse = await userApiInstance.get(
                `/api/v2/authorization/token/validate?token=${accessToken}`,
                {
                    headers: {
                        'Private-Key': PRIVATE_KEY,
                        'Authorization': accessToken,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const validateData = await validateResponse.data;

            if (validateResponse.status === 200 && validateData.status === 200) {
                try {
                    const userResponse = await userApiInstance.get("api/v2/account/profile/basic", {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    });

                    const userInfo = userResponse.data.user_info;

                    return res.status(200).json({
                        authenticated: true,
                        message: 'Access token is valid',
                        user: {
                            user_id: userInfo.user_id,
                            fullname: userInfo.fullname,
                            email: userInfo.email,
                            is_email_verified: userInfo.is_email_verified,
                            is_phone_verified: userInfo.is_phone_verified,
                            date_of_birth: userInfo.date_of_birth
                        }
                    });
                } catch (profileError) {
                    console.error('Profile fetch error:', profileError);
                    return res.status(200).json({
                        authenticated: true,
                        message: 'Access token is valid'
                    });
                }
            }

            if (validateResponse.status === 401 || validateData.status === 401) {
                const deviceId = getDeviceId();

                try {
                    const renewResponse = await userApiInstance.get(
                        `/api/v2/authorization/token/renew`,
                        {
                            headers: {
                                'X-Old-Access-Token': accessToken,
                                'X-Device-ID': deviceId,
                                'Private-Key': PRIVATE_KEY,
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    const renewData = await renewResponse.data;

                    if (renewResponse.status === 200 && renewData.status === 200) {
                        const maxAge = renewData.expires_in || 3600 * 24 * 7;
                        res.setHeader('Set-Cookie', [
                            `access_token=${renewData.access_token}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict`
                        ]);

                        try {
                            const userResponse = await userApiInstance.get("api/v2/account/profile/basic", {
                                headers: {
                                    "Authorization": `Bearer ${renewData.access_token}`
                                }
                            });

                            const userInfo = userResponse.data.user_info;

                            return res.status(200).json({
                                authenticated: true,
                                renewed: true,
                                access_token: renewData.access_token,
                                expires_in: renewData.expires_in,
                                message: 'Token renewed successfully',
                                user: {
                                    user_id: userInfo.user_id,
                                    fullname: userInfo.fullname,
                                    // email: userInfo.email,
                                    // is_email_verified: userInfo.is_email_verified,
                                    // is_phone_verified: userInfo.is_phone_verified,
                                    // date_of_birth: userInfo.date_of_birth
                                }
                            });
                        } catch (profileError) {
                            console.error('Profile fetch error after renewal:', profileError);
                            return res.status(200).json({
                                authenticated: true,
                                renewed: true,
                                access_token: renewData.access_token,
                                expires_in: renewData.expires_in,
                                message: 'Token renewed successfully'
                            });
                        }
                    }

                    if (renewResponse.status === 400 || renewData.error === "Refresh token is required") {
                        res.setHeader('Set-Cookie', [
                            'access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict'
                        ]);

                        return res.status(200).json({
                            authenticated: false,
                            clearToken: true,
                            message: 'Token renewal failed, please login again'
                        });
                    }

                    res.setHeader('Set-Cookie', [
                        'access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict'
                    ]);

                    return res.status(200).json({
                        authenticated: false,
                        clearToken: true,
                        error: renewData.error || 'Token renewal failed'
                    });

                } catch (renewError) {
                    console.error('Token renewal error:', renewError);

                    // Clear the token on renewal error
                    res.setHeader('Set-Cookie', [
                        'access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict'
                    ]);

                    return res.status(200).json({
                        authenticated: false,
                        clearToken: true,
                        error: 'Token renewal failed'
                    });
                }
            }

            // Other validation errors
            return res.status(200).json({
                authenticated: false,
                error: validateData.error || 'Token validation failed'
            });

        } catch (validateError) {
            console.error('Token validation error:', validateError);
            return res.status(500).json({
                authenticated: false,
                error: 'Token validation failed'
            });
        }

    } catch (error) {
        console.error('Auth status error:', error);
        return res.status(500).json({
            authenticated: false,
            error: 'Internal server error'
        });
    }
}
