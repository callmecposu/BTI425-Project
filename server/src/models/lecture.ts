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