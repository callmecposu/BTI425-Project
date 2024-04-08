import { Request, Response } from "express";
import CourseModel, { Course } from "../../models/course";
import LectureModel from "../../models/lecture";

const getCourse = async (req: Request, res: Response) => {
    // find the course
    const course = await CourseModel.findOne({_id: req.params.id});
    // find its lectures
    let lectures = []
    for (let i = 0; i < (course?.lectures.length as number); i++){
        const lec = await LectureModel.findOne({_id: course?.lectures[i]})
        lectures.push(lec)
    }
    res.status(200).json({course, lectures})
}

export default getCourse