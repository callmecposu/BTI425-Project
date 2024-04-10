import { Request, Response } from "express";
import CourseModel from "../../models/course";

const getCourses = async (req: Request, res: Response) => {
    let courses: any = []
    if (req.query.q) {
        // perform a full text search on courses
        courses = await CourseModel.find({
            $text: {
                $search: `${req.query.q as string}`,
                $caseSensitive: false,
                $language: "en",
            },
        });
    } else {
        courses = await CourseModel.find()
    }
    // return the courses
    res.status(200).json(courses);
};

export default getCourses;
