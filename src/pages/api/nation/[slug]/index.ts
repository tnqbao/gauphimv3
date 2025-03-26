import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { slug } = req.query;
        const page = req.query.page ? Number(req.query.page) : 1;
        const { data } = await axios.get(`${process.env.SERVERSIDE_API}/api/gauflix/nation/${slug}?page=${page}`);

        if (!data) {
            throw new Error("API không trả về dữ liệu hợp lệ");
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.error("Lỗi API:", error);
        res.status(500).json({ e: "Lỗi server", error });
    }
}
