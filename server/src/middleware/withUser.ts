/****************************************************************************** 
 * BTI425 – Project
 * 
 * I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Group member Name: Vladyslav Huziienko, Maksym Volkovynskyi 
 * Student IDs: 180749210, 126867225
 * Date: 18 April 2024
*****************************************************************************/
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