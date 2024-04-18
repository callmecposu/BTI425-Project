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
import { Request, Response } from "express";
import UserModel from "../../models/user";

const addToWishlist = async (req: Request, res: Response) => {
    // if course is not in the wishlist, add it
    if (!req.user?.wishlist.includes(req.body.course_id)){
        req.user?.wishlist.push(req.body.course_id)
    }
    await req.user?.save()
    // return the updated user
    res.status(200).json(req.user)
}

export default addToWishlist