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
import LectureModel from "../../models/lecture";

const deleteLecture = async (req: Request, res: Response) => {
    // see if the user can delete the lecture
    let course = await CourseModel.findOne({ lectures: req.params.id });
    if (course?.author_id != req.user?._id) {
        res.status(401).json("You are not authorized to delete this lecture!");
        return;
    }
    // delete the lecture
    await LectureModel.deleteOne({ _id: req.params.id });
    // remove the lecture from the course
    (course as any).lectures = (course as any).lectures.filter(
        (l: string) => l != req.params.id
    );
    await course?.save();
    res.status(200).json(course);
};

export default deleteLecture;
