import { Request, Response, NextFunction } from "express";
import { jwtToUser } from "../utils/jwt";
import { User } from "../models/user";

const withUser = async (req: Request, res: Response, next: NextFunction) => {
    // retrieve the authorization token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token){
        res.status(400).json({message: "Authorization Header is required!"});
        return;
    }
    console.log('token: ', token);
    const user = await jwtToUser(token as string);
    req.user = user as User;
    next()
}

export default withUser