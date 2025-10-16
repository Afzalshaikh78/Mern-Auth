import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

// Middleware in correct order
app.use(express.json());
app.use(cookieParser());

// CORS - CRITICAL CONFIGURATION
const corsOptions = {
  origin: "https://mern-auth-client-dmw5.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Test route to verify CORS is working
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!", timestamp: new Date() });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for: http://localhost:5173`);
});
