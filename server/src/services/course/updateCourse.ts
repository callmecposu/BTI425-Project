import { Request, Response } from "express";
import CourseModel from "../../models/course";

const updateCourse = async (req: Request, res: Response) => {
    console.log("author: ", req.user);
    // create an update obejct for the course
    let update: any = {};
    if (req.body.title) {
        update.title = req.body.title;
    }
    if (req.body.description) {
        update.description = req.body.description;
    }
    if (req.body.learning_outcomes) {
        update.learning_outcomes = req.body.learning_outcomes;
    }
    // update the course
    let updatedCourse = await CourseModel.findOneAndUpdate(
        { _id: req.params.id },
        update,
        { new: true }
    );
    // return the updated course
    res.status(200).json(updatedCourse)
};

export default updateCourse;
