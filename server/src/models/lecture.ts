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
import mongoose, {Schema, Document} from "mongoose";

// lecture
// - title
// - content

interface Lecture extends Document {
    title: string,
    content: string
}

const lectureSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: 'There is no content in this lecture.'
    }
})

const LectureModel = mongoose.model<Lecture>('Lecture', lectureSchema);

export default LectureModel;