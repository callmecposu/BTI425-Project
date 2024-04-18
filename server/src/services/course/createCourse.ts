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
import { jwtToUser } from "../../utils/jwt";
import CourseModel from "../../models/course";

const createCourse = async (req: Request, res: Response) => {
    console.log('author: ', req.user)
    // create the course
    console.log('req.body: ', req.body)
    const newCourse = new CourseModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        rating: Math.floor(((Math.random() * 2) + 3) * 10) / 10,
        learning_outcomes: req.body.learning_outcomes,
        author_id: req.user?._id,
    })
    const savedCourse = await newCourse.save()
    // return the new course
    res.status(200).json(savedCourse);
}

export default createCourse;