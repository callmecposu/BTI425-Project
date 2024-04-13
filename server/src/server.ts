// src/index.ts
import bodyParser from "body-parser";
import express from "express";
import createUser from "./services/user/createUser";
import mongoose from "mongoose";
import getUserFromJwt from "./services/user/getUserFromJwt";
import login from "./services/user/login";
import { User } from "./models/user";
import withUser from "./middleware/withUser";
import createCourse from "./services/course/createCourse";
import updateCourse from "./services/course/updateCourse";
import getCourse from "./services/course/getCourse";
import createLecture from "./services/lecture/createLecture";
import updateLecture from "./services/lecture/updateLecture";
import deleteLecture from "./services/lecture/deleteLecture";
import getCourses from "./services/course/getCourses";
import addToWishlist from "./services/user/addToWishlist";
import removeFromWishlist from "./services/user/removeFromWishlist";
import purchaseCourse from "./services/user/purchaseCourse";
require("dotenv").config();
const cors = require("cors");

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/create_user", createUser);
app.post("/login", login);
app.get("/get_user_from_jwt", withUser, getUserFromJwt);
app.post("/add_to_wishlist", withUser, addToWishlist)
app.post('/remove_from_wishlist', withUser, removeFromWishlist)
app.get('/purchase_course/:course_id', withUser, purchaseCourse)

app.get('/courses', getCourses)
app.get("/course/:id", getCourse);
app.post("/create_course", withUser, createCourse);
app.post("/update_course/:id", withUser, updateCourse);

app.post("/create_lecture", withUser, createLecture);
app.post('/update_lecture/:id', withUser, updateLecture)
app.delete('/delete_lecture/:id', withUser, deleteLecture)

mongoose.connect(process.env.MONGODB as string).then(() => {
    console.log("Connected to DB!");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
