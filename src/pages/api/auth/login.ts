import {NextApiRequest, NextApiResponse} from 'next';
import {userApiInstance} from "@/utils/axios.config";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const {email, password, keepLogin} = req.body;

            if (!email || !password) {
                return res.status(400).json({message: 'Username and password are required'});
            }

            const requestData = {
                username: email,
                password,
                keepLogin: keepLogin.toString()
            }

            console.log(requestData);
            const response = await userApiInstance.post('api/user/auth/login',
                requestData
            );

            if (response.status !== 200) {
                return res.status(response.data).json({message: response.data});
            }

            const token = response.data.token;
            const shouldKeepLogin = keepLogin === 'true';

            res.setHeader('Set-Cookie', serialize('auth_token', token, {
                httpOnly: true,
                maxAge: shouldKeepLogin ? 30 * 24 * 60 * 60 : undefined,
                path: '/',
            }));

            res.status(200).json({user: response.data.user});
        } catch (error) {
            console.error(error);
            res.status(401).json({message: 'Invalid username or password'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
