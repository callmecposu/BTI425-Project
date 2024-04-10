import { Request, Response } from "express";
import LectureModel from "../../models/lecture";
import CourseModel from "../../models/course";

const createLecture = async (req: Request, res: Response) => {
    // check if user has permission to add lectures to the course
    const course = await CourseModel.findOne({ _id: req.body.course_id });
    if (course?.author_id != req.user?._id) {
        res.status(401).json({
            message: "You are not authorized to add lectures to this course!",
        });
        return
    }
    // create lecture
    const newLecture = new LectureModel({
        title: req.body.title,
        content: req.body.content,
    });
    const savedLecture = await newLecture.save();
    // add the new lecture to its course
    await CourseModel.updateOne(
        { _id: req.body.course_id },
        {
            $push: {
                lectures: savedLecture._id,
            },
        }
    );
    // return the new lecture
    res.status(200).json(savedLecture);
};

export default createLecture;
