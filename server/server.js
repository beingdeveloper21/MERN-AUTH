import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'https://mern-auth-pi-peach.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow requests with no origin (like Postman or Curl)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.get('/', (req, res) => res.send("API Working ✅"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start Server
app.listen(port, () => console.log(`🚀 Server running on PORT: ${port}`));
