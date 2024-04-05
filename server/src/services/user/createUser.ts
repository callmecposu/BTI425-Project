import { Request, Response } from "express";
import UserModel from "../../models/user";
import bcrypt from 'bcrypt';
import { createJwt } from "../../utils/jwt";

const createUser = async (req: Request, res: Response) => {
    // see if user with such email already exists
    const userWithGivenEmail = await UserModel.findOne({
        email: req.body.email,
    });
    console.log("user with given email: ", userWithGivenEmail);
    if (userWithGivenEmail){
        // return an error
        res.status(400).json({message: `User with email \'${req.body.email}\' already exists!`})
        return;
    }
    // hash the password
    const hashedPw = await bcrypt.hash(req.body.password, 10)
    console.log('hashed password: ', hashedPw);
    // create and save the new user
    const newUser = new UserModel({
        email: req.body.email,
        password: hashedPw,
        name: req.body.name
    })
    const savedUser = await newUser.save();
    // create a jwt for the user
    const token = createJwt(savedUser._id);
    console.log("user token: ", token);
    // return the new user
    res.status(200).json({token});
};

export default createUser;
