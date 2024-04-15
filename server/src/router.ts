import express, { Router } from "express";
import createUser from "./services/user/createUser";
import getUserFromJwt from "./services/user/getUserFromJwt";
import login from "./services/user/login";
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

const router = Router()

router.post("/create_user", createUser);
router.post("/login", login);
router.get("/get_user_from_jwt", withUser, getUserFromJwt);
router.post("/add_to_wishlist", withUser, addToWishlist);
router.post("/remove_from_wishlist", withUser, removeFromWishlist);
router.get("/purchase_course/:course_id", withUser, purchaseCourse);

router.get("/courses", getCourses);
router.get("/course/:id", getCourse);
router.post("/create_course", withUser, createCourse);
router.post("/update_course/:id", withUser, updateCourse);

router.post("/create_lecture", withUser, createLecture);
router.post("/update_lecture/:id", withUser, updateLecture);
router.delete("/delete_lecture/:id", withUser, deleteLecture);

export default router;
