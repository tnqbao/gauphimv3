import {NextApiRequest, NextApiResponse} from "next";
import {parse} from "cookie";
import axios from "axios";

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const {title, slug, poster_url, movie_episode} = req.body;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await axios.post(`${process.env.SERVERSIDE_API}/api/gauflix/history`, {
            data: {title, slug, poster_url, movie_episode},
            headers: {
                Authorization: `${token}`,
            },
        });
        if (response.status != 200) {
            res.status(response.status).json({error: response.data.error});
        }
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: "Error update history data", error});
    }
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await axios.get(`${process.env.SERVERSIDE_API}/api/gauflix/history`, {
            headers: {
                Authorization: `${token}`,
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

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await axios.delete(`${process.env.SERVERSIDE_API}/api/gauflix/history`, {
            headers: {
                Authorization: `${token}`,
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