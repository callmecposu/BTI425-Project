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
import mongoose from "mongoose";
import request from "supertest";
import app from "../server";

require("dotenv").config();

let server:any;

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB as string);
    server = app.listen(3001)
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connect(process.env.MONGODB as string);
    await server.close()
});

describe("POST /login", () => {
    it("should login with an exisiting user", async () => {
        const res = await request(app).post('/login')
        .send({
            email: "jeff.grotenberg@gmail.com",
            password: '123'
        });
        expect(res.statusCode).toBe(200)
    })
    it("should throw an error when user does not exist", async () => {
        const res = await request(app).post('/login')
        .send({
            email: "i dont exist",
            password: "blabla"
        });
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe("User with email \'i dont exist\' does not exist!")
    })
    it("should throw an error if the passwords do not match", async () => {
        const res = await request(app).post('/login')
        .send({
            email: "jeff.grotenberg@gmail.com",
            password: "qwerty"
        });
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("Incorrect Password!")
    })
})

describe("POST /create_user", () => {
    it("should throw an error if user with such email already exists", async () => {
        const res = await request(app).post('/create_user')
        .send({
            email: "jeff.grotenberg@gmail.com",
            password: "123"
        });
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("User with email \'jeff.grotenberg@gmail.com\' already exists!")
    })
})

describe("GET /get_user_from_jwt", () => {
    it("should return a user object when provided a valid JWT in the \'Authorization\' header", async () => {
        const loginRes = await request(app).post('/login')
        .send({
            email: "jeff.grotenberg@gmail.com",
            password: "123"
        });
        expect(loginRes.statusCode).toBe(200)
        const getFromJWTRes = await request(app).get('/get_user_from_jwt')
        .set('Authorization', `Bearer ${loginRes.body.token}`)
        expect(getFromJWTRes.status).toBe(200)
    })
    it("should return an error if \'Authorization\' token was not provided", async () => {
        const res = await request(app).get('/get_user_from_jwt')
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe("Authorization Header is required!")
    })
})

export default app;