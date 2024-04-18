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
    server = app.listen(3002)
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connect(process.env.MONGODB as string);
    await server.close()
});

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB as string);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connect(process.env.MONGODB as string);
});

describe('GET /course/:id', () => {
    it('should return the course information without lectures\' content if no \'Authorization\' header was provided', async () => {
        const res = await request(app).get('/course/660f680a49d6edc051f49279')
        expect(res.statusCode).toBe(200)
        res.body.lectures.forEach((lec: any) => {
            expect(lec.content).toBeUndefined()
        })
    })
    it('should return the course information without lectures\' content if user has not bought the course', async () => {
        const loginRes = await request(app).post('/login')
        .send({
            email: "callme@gmail.com",
            password: "123"
        })
        expect(loginRes.statusCode).toBe(200)
        const res = await request(app).get('/course/660f680a49d6edc051f49279')
        .set('Authorization', `Bearer ${loginRes.body.token}`)
        expect(res.statusCode).toBe(200)
        res.body.lectures.forEach((lec: any) => {
            expect(lec.content).toBeUndefined()
        })
    })
    it("should return the course with lectures content if user has bought the course", async () => {
        const loginRes = await request(app).post('/login')
        .send({
            email: "john.doe@gmail.com",
            password: "123"
        })
        expect(loginRes.statusCode).toBe(200)
        const res = await request(app).get('/course/660f680a49d6edc051f49279')
        .set('Authorization', `Bearer ${loginRes.body.token}`)
        expect(res.statusCode).toBe(200)
        res.body.lectures.forEach((lec: any) => {
            expect(lec.content).toBeDefined()
        })
    })
    it("should return the course with lectures content if user is the course's author", async () => {
        const loginRes = await request(app).post('/login')
        .send({
            email: "jeff.grotenberg@gmail.com",
            password: "123"
        })
        expect(loginRes.statusCode).toBe(200)
        const res = await request(app).get('/course/660f680a49d6edc051f49279')
        .set('Authorization', `Bearer ${loginRes.body.token}`)
        console.log(res.body)
        expect(res.statusCode).toBe(200)
        res.body.lectures.forEach((lec: any) => {
            expect(lec.content).toBeDefined()
        })
    })
})