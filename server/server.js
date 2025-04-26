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

// Allowed origins for CORS
const allowedOrigins = ['http://localhost:5173', 'https://mern-auth-pi-peach.vercel.app'];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Allow cookies and credentials to be sent
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],  // Allow headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
};

// Middleware setup
app.use(cors(corsOptions));  // Use CORS with options
app.use(express.json());      // Parse JSON request bodies
app.use(cookieParser());      // Parse cookies

// Public routes (no authentication required)
app.use('/api/auth', authRouter);

// Protected routes (authentication required)
app.use('/api/user', userAuth, userRouter);  // Apply userAuth middleware here

// Test route
app.get('/', (req, res) => res.send("API Working"));

// Start the server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
