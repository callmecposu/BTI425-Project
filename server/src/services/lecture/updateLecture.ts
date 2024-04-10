import { Request, Response } from "express";
import CourseModel from "../../models/course";
import LectureModel from "../../models/lecture";

const updateLecture = async (req: Request, res: Response) => {
    // check if user can edit the lecture
    const course = await CourseModel.findOne({ lectures: req.params.id });
    if (course?.author_id != req.user?._id) {
        res.status(401).json({
            message: "You are not authorized to update this lecture!",
        });
        return;
    }
    // create the update object for the lecture
    let update: any = {};
    if (req.body.title) {
        update.title = req.body.title;
    }
    if (req.body.content) {
        update.content = req.body.content;
    }
    // update the lecture
    const updatedLecture = await LectureModel.findOneAndUpdate(
        { _id: req.params.id },
        update,
        { new: true }
    );
    // return the updated lecture
    res.status(200).json(updatedLecture);
};

export default updateLecture;
