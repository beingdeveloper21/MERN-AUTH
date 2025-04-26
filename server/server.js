import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import userAuth from './middlewares/userAuth.js';  // Import userAuth middleware

const app = express();
const port = process.env.PORT || 4000;
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
  allowedHeaders: ['Content-Type', 'Authorization'],  // Explicitly allow Content-Type and Authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// API ENDPOINTS
app.get('/', (req, res) => res.send("API Working"));

// Public routes (no authentication required)
app.use('/api/auth', authRouter);

// Protected routes (authentication required)
app.use('/api/user', userAuth, userRouter);  // Apply the userAuth middleware here

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
