import express from "express";

import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";



const PORT = process.env.PORT || 3000;
const app = express();
connectDB();

const allowedOrigins = ["http://localhost:5173"];



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// app.use(cors({ credentials: true, origin: true }));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})