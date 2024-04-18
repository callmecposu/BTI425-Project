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
