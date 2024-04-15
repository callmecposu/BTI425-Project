// src/index.ts
import bodyParser from "body-parser";
import express from "express";
import { User } from "./models/user";
import router from "./router";
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

app.use(bodyParser.json());
app.use(cors());

app.use('/', router)

export default app;

