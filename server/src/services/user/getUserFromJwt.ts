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
import {Request, Response} from 'express'
import { jwtToUser } from '../../utils/jwt';



const getUserFromJwt = async (req: Request, res: Response) => {
    console.log("req headers: ", req.headers);
    res.status(200).json(req.user);
}

export default getUserFromJwt;