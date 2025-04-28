import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import userAuth from './middleware/userAuth.js';  // Import userAuth middleware

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Allow these origins
const allowedOrigins = ['http://localhost:5173','https://mern-auth-chi-one.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.get('/', (req, res) => res.send("API Working"));

app.use('/api/auth', authRouter);
app.use('/api/user', userAuth, userRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
