import mongoose, {Schema, Document} from "mongoose";

// user
// - name
// - email
// - password
// - wishlist
// - purchased_courses

export interface User extends Document {
    email: string,
    name: string,
    password: string,
    wishlist: string[],
    purchased_courses: string[],
    is_author: boolean
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: {
        type: [String],
        default: []
    },
    purchased_courses: {
        type: [String],
        default: []
    },
    is_author: {
        type: Boolean,
        default: false
    }
})

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;