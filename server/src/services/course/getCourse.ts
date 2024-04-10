import { Request, Response } from "express";
import CourseModel, { Course } from "../../models/course";
import LectureModel from "../../models/lecture";
import UserModel from "../../models/user";

const getCourse = async (req: Request, res: Response) => {
    // find the course
    const course = await CourseModel.findOne({ _id: req.params.id });
    // find its lectures
    let lectures = [];
    for (let i = 0; i < (course?.lectures.length as number); i++) {
        const lec = await LectureModel.findOne({ _id: course?.lectures[i] });
        // remove the content property if user has not purchased this course
        // AND they are not the author
        let lecture: any = {};
        if (
            !req.user?.purchased_courses.includes(req.params.id) &&
            req.user?._id != course?.author_id
        ) {
            lecture._id = lec?._id;
            lecture.title = lec?.title;
        } else {
            lecture = lec;
        }
        lectures.push(lecture);
    }
    // find the author
    const author = await UserModel.findOne({ _id: course?.author_id });
    res.status(200).json({
        course,
        lectures,
        author: { id: author?._id, name: author?.name },
    });
};

export default getCourse;
