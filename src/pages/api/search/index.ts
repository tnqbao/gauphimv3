import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        const keyword = req.query.keyword;
        const response = await axios.get(`${process.env.SERVERSIDE_API}/api/gauflix/search?keyword=${encodeURIComponent(keyword as string)}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (response.status !== 200) {
            res.status(response.status).json({ error: "Lỗi khi gọi API" });
        }

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Lỗi API:", error);
        res.status(500).json({ e: "Lỗi server", error });
    }
}
