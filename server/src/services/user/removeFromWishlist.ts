import { Request, Response } from "express";
import UserModel from "../../models/user";

const removeFromWishlist = async (req: Request, res: Response) => {
    // if the item is present in the wishlist, remove it
    if (req.user?.wishlist.includes(req.body.course_id)){
        req.user.wishlist = req.user.wishlist.filter(item => item != req.body.course_id)
    }
    await req.user?.save()
    // return the updated user
    res.status(200).json(req.user)
}

export default removeFromWishlist