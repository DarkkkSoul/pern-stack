import express from "express";
import { ENV } from "./config/env.ts";
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import userRouter from './routes/user.routes.ts'
import productsRouter from './routes/products.routes.ts'
import commentsRouter from './routes/comments.routes.ts'

const app = express();


app.use(clerkMiddleware())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ENV.CORS_ORIGIN,
    credentials: true
}))


app.use('/api/user', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/comments', commentsRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});