import { NextApiRequest, NextApiResponse } from "next";
import { getDeviceId } from "@/utils/device";

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
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!PRIVATE_KEY || !API_BASE_URL) {
        return res.status(500).json({
            authenticated: false,
            error: 'Server configuration error'
        });
    }

    try {
        // Get access token from request
        const accessToken = getAccessToken(req);

        // If no access token, user is not authenticated
        if (!accessToken) {
            return res.status(200).json({
                authenticated: false,
                message: 'No access token found'
            });
        }

        // Step 1: Validate the access token
        try {
            const validateResponse = await fetch(
                `${API_BASE_URL}/api/v2/authorization/token/validate?token=${accessToken}`,
                {
                    method: 'GET',
                    headers: {
                        'Private-Key': PRIVATE_KEY,
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const validateData = await validateResponse.json();

            // If token is valid
            if (validateResponse.status === 200 && validateData.status === 200) {
                return res.status(200).json({
                    authenticated: true,
                    message: 'Access token is valid'
                });
            }

            // If token is invalid or expired (401 status)
            if (validateResponse.status === 401 || validateData.status === 401) {
                // Step 2: Try to renew the token
                const deviceId = getDeviceId();

                try {
                    const renewResponse = await fetch(
                        `${API_BASE_URL}/api/v2/authorization/token/renew`,
                        {
                            method: 'GET',
                            headers: {
                                'X-Old-Access-Token': accessToken,
                                'X-Device-ID': deviceId,
                                'Private-Key': PRIVATE_KEY,
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    const renewData = await renewResponse.json();

                    // Token renewal successful
                    if (renewResponse.status === 200 && renewData.status === 200) {
                        // Set new token in cookie
                        const maxAge = renewData.expires_in || 36288000; // Default 420 days
                        res.setHeader('Set-Cookie', [
                            `access_token=${renewData.access_token}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict`
                        ]);

                        return res.status(200).json({
                            authenticated: true,
                            renewed: true,
                            access_token: renewData.access_token,
                            expires_in: renewData.expires_in,
                            message: 'Token renewed successfully'
                        });
                    }

                    // Token renewal failed
                    if (renewResponse.status === 400 || renewData.error === "Refresh token is required") {
                        // Clear the invalid token from cookies
                        res.setHeader('Set-Cookie', [
                            'access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict'
                        ]);

                        return res.status(200).json({
                            authenticated: false,
                            clearToken: true,
                            message: 'Token renewal failed, please login again'
                        });
                    }

                    // Other renewal errors
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
