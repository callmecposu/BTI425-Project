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

const purchaseCourse = async (req: Request, res: Response) => {
    // if user hasn't purchased this course, add it to their purchased_courses
    if (!req.user?.purchased_courses.includes(req.params.course_id)) {
        req.user?.purchased_courses.push(req.params.course_id);
    }
    // if the course was in user's wishlist, remove it
    if (req.user?.wishlist.includes(req.params.course_id)) {
        req.user.wishlist = req.user.wishlist.filter(
            (item) => item != req.params.id
        );
    }
    await req.user?.save();
    // return the updated user
    res.status(200).json(req.user);
};

export default purchaseCourse;
