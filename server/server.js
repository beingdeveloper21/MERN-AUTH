import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Allowed Origins for CORS
const allowedOrigins = ['http://localhost:5173', 'https://mern-auth-pi-peach.vercel.app'];

app.use(express.json());
app.use(cookieParser());

// CORS Configuration (allow credentials and specific origins)
app.use(cors({
  origin: allowedOrigins,
  credentials: true,  // Allow cookies to be sent
}));

// API Endpoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));
