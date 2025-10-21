import type { NextApiRequest, NextApiResponse } from 'next';
import { userApiInstance } from '@/utils/axios.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Không tìm thấy token' });
    }

    if (req.method === 'GET') {
        try {
            const response = await userApiInstance.get('/api/v2/account/profile/complete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status(200).json(response.data);
        } catch (error) {
            const err = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
            return res.status(err.response?.status || 500).json({
                success: false,
                message: err.response?.data?.message || 'Lỗi khi lấy thông tin hồ sơ',
            });
        }
    }

    if (req.method === 'PUT') {
        try {
            const response = await userApiInstance.put('/api/v2/account/profile', req.body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.status(200).json({ success: true, data: response.data });
        } catch (error) {
            const err = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
            return res.status(err.response?.status || 500).json({
                success: false,
                message: err.response?.data?.message || 'Lỗi khi cập nhật thông tin',
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

