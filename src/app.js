import express from "express";
import cors from "cors";
import morgan from "morgan";
import postRoutes from "./routes/post.routes.js";
import errorHandler from "./middlwares/error.middleware.js";
import helmet from "helmet";
const app = express();

//MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


app.use("/api/posts",postRoutes);
app.use(errorHandler);
app.use(helmet());

//heath check route

app.get("/",(req,res)=>{
    res.json({ message: "API RUNNING"});
});

export default app;