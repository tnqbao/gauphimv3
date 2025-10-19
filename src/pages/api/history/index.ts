import {NextApiRequest, NextApiResponse} from "next";
import {parse} from "cookie";
import axios from "axios";
import {userApiInstance} from "@/utils/axios.config";




const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.access_token || req.headers.authorization;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    console.log("ping GET history API");
    try {
        const response = await userApiInstance.get(`api/gauflix/history`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status != 200) {
            throw new Error("No data");
        }
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({"mes": "Error fetching history data", error});
    }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { title, slug, poster_url, movie_episode } = req.body;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.access_token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const response = await userApiInstance.post(`api/gauflix/history`,
            {
                title, slug, poster_url, movie_episode },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });


        console.log("History updated:", response.data);
        return res.status(200).json(response.data);

    } catch (error) {
        console.error("POST history error:", error);
        return res.status(500).json({ message: "Faild to update history" });
    }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.access_token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await userApiInstance.delete(`api/gauflix/history`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: "Error delete history data", error});
    }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
        case "POST":
            return handlePost(req, res);
        case "DELETE":
            return handleDelete(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}