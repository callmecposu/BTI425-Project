import mongoose, {Schema, Document, StringExpression} from "mongoose";

// course
// - title
// - description
// - price
// - rating
// - learning_outcomes
// - author_id
// - lectures: [id]

interface Course extends Document {
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