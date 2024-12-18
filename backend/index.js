import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectDb from "./components/ConnectDb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://realtor-frontend-xi.vercel.app", "http://localhost:3000",
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true, // allow cookies
}));


app.get('/api', (req, res) => {
  res.send("my api")
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  ConnectDb();
})