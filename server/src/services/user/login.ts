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
import UserModel from '../../models/user'
import bcrypt from 'bcrypt'
import { createJwt } from '../../utils/jwt';

const login = async (req: Request, res: Response) => {
    // see if the user exists
    const userWithGivenEmail = await UserModel.findOne({email: req.body.email});
    if (!userWithGivenEmail){
        res.status(404).json({message: `User with email \'${req.body.email}\' does not exist!`});
        return;
    }
    // compare the passwords
    const match = await bcrypt.compare(req.body.password, userWithGivenEmail.password);
    if (!match){
        res.status(400).json({message: 'Incorrect Password!'});
        return;
    }
    // create a jwt for the user
    const token = createJwt(userWithGivenEmail._id);
    res.status(200).json({token});
}

export default login;
