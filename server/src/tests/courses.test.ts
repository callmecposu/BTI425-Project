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
        expect(res.statusCode).toBe(200)
        res.body.lectures.forEach((lec: any) => {
            expect(lec.content).toBeDefined()
        })
    })
})

describe('GET /courses', () => {
    it('should return all the courses if no \'q\' query parameter was provided', async () => {
        const res = await request(app).get('/courses')
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThanOrEqual(3)
    })
    it('should return specific courses if \'q\' query parameter was provided', async () => {
        const res = await request(app).get('/courses?q=python')
        expect(res.status).toBe(200)
        expect(res.body.length).toBe(2)
    })
})