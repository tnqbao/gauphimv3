import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { data } = await axios.get(`${process.env.SERVERSIDE_API}/api/gauflix/home-page`);        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ e: "Lỗi server" , error });
    }
}
