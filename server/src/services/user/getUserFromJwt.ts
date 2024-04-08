import {Request, Response} from 'express'
import { jwtToUser } from '../../utils/jwt';



const getUserFromJwt = async (req: Request, res: Response) => {
    console.log("req headers: ", req.headers);
    res.status(200).json(req.user);
}

export default getUserFromJwt;