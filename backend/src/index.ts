import express from "express";
import { ENV } from "./config/env.ts";
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'

const app = express();


app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ENV.CORS_ORIGIN
}))

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});