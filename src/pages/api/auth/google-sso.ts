import type {NextApiRequest, NextApiResponse} from 'next'
import {userApiInstance} from "@/utils/axios.config";
import { getDeviceId } from "@/utils/device";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    try {
        const {token} = req.body

        if (!token) {
            return res.status(400).json({message: 'Google access token is required'})
        }

        // Use the existing getDeviceId function like in regular login
        const deviceId = getDeviceId();

        const response = await userApiInstance.post(`/api/v2/account/sso/google`, {
            token: token
        }, {
            headers: {
                "X-Device-ID": deviceId
            }
        })

        // For Axios, the data is directly available in response.data
        const data = response.data

        // Return the same format as your regular login
        return res.status(200).json({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
            user: data.user,
            status: data.status
        })

    } catch (error) {
        console.error('Google SSO Error:', error)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}
