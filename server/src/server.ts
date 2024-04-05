// src/index.ts
import bodyParser from "body-parser";
import express from "express";
import createUser from "./services/user/createUser";
import mongoose from "mongoose";
import getUserFromJwt from "./services/user/getUserFromJwt";
import login from "./services/user/login";
require("dotenv").config();
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/create_user", createUser);
app.post("/login", login);
app.get('/get_user_from_jwt', getUserFromJwt);

mongoose.connect(process.env.MONGODB as string).then(() => {
    console.log("Connected to DB!");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
