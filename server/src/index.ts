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
import app from "./server";
import mongoose from "mongoose";

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    mongoose.connect(process.env.MONGODB as string).then(() => {
        console.log("Connected to DB!");
    });
});