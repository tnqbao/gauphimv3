import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    if (req.method === "DELETE") {
        res.setHeader("Allow", ["DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { slug } = req.query;
        const response = await axios.delete(`${process.env.SERVERSIDE_API}/api/gauflix/history/${slug}`);

        if (response.status != 200) {
            throw new Error("");
        }

        res.status(200).json({"message": "Xóa lịch sử thành công"})
    } catch (error) {
        console.error("Lỗi API:", error);
        res.status(500).json({ e: "Lỗi server", error });
    }
}