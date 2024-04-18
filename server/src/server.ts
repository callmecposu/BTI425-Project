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

