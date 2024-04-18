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
import mongoose, {Schema, Document, StringExpression} from "mongoose";

// course
// - title
// - description
// - price
// - rating
// - learning_outcomes
// - author_id
// - lectures: [id]

export interface Course extends Document {
    title: string,
    description: string,
    price: number,
    rating: number,
    learning_outcomes: string[],
    author_id: string,
    lectures: string[]
}

const courseSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    learning_outcomes: {
        type: [String],
        default: []
    },
    author_id: {
        type: String,
        required: true
    },
    lectures: {
        type: [String],
        default: []
    }
})

const CourseModel = mongoose.model<Course>('Course', courseSchema);

export default CourseModel;