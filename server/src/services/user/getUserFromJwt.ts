import {Request, Response} from 'express'
import { jwtToUser } from '../../utils/jwt';



const getUserFromJwt = async (req: Request, res: Response) => {
    console.log("req headers: ", req.headers);
    // retrieve the authorization token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){
        res.status(400).json({message: "Authorization Header is required!"});
        return;
    }
    console.log('token: ', token);
    const user = await jwtToUser(token as string);
    res.status(200).json(user);
}

export default getUserFromJwt;