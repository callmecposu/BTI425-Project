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