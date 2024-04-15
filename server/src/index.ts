import app from "./server";
import mongoose from "mongoose";

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    mongoose.connect(process.env.MONGODB as string).then(() => {
        console.log("Connected to DB!");
    });
});