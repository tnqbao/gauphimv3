import type { NextApiRequest, NextApiResponse } from 'next';
import { userApiInstance } from '@/utils/axios.config';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Không tìm thấy token' });
    }

    try {
        const form = formidable({});
        const [, files] = await form.parse(req);

        const file = files.file?.[0];
        if (!file) {
            return res.status(400).json({ success: false, message: 'Không tìm thấy file' });
        }

        const formData = new FormData();
        const fileBuffer = fs.readFileSync(file.filepath);
        const blob = new Blob([fileBuffer], { type: file.mimetype || 'image/jpeg' });
        formData.append('file', blob, file.originalFilename || 'avatar.jpg');

        const response = await userApiInstance.patch('/api/v2/account/profile/avatar', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        const err = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
        return res.status(err.response?.status || 500).json({
            success: false,
            message: err.response?.data?.message || 'Lỗi khi cập nhật ảnh đại diện',
        });
    }
}

