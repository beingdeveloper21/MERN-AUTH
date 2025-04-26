import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'


const app=express();
const port=process.env.PORT||4000
connectDB();
const allowedOrigins = ['http://localhost:5173', 'https://mern-auth-pi-peach.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());
//API ENDPOINTS
app.get('/',(req,res)=>
    res.send("API Working"));
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>console.log(`Server started on PORT:${port}`));