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