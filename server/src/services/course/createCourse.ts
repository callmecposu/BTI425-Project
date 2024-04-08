import { Request, Response } from "express";
import { jwtToUser } from "../../utils/jwt";
import CourseModel from "../../models/course";

const createCourse = async (req: Request, res: Response) => {
    console.log('author: ', req.user)
    // create the course
    const newCourse = new CourseModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        rating: Math.floor(((Math.random() * 2) + 3) * 10) / 10,
        learning_outcomes: req.body.learning_outcomes,
        author_id: req.user?._id,
        lectures: req.body.lectures
    })
    const savedCourse = await newCourse.save()
    // return the new course
    res.status(200).json(savedCourse);
}

export default createCourse;