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
import jwt from "jsonwebtoken";
import UserModel from "../models/user";

const createJwt = (userId: string) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
    return token;
};

const decodeJwt = (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
};

const jwtToUser = async (token: string) => {
    // decode the token
    const decoded = decodeJwt(token)
    console.log('decoded from token: ', decoded)
    // find the user in the db
    const user = await UserModel.findOne({_id: (decoded as any).userId});
    console.log('found user: ', user);
    return user;
}

export {
    createJwt, decodeJwt, jwtToUser
}
