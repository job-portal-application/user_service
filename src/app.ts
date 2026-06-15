import express from "express";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json({
    limit: "100mb"}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", router);

export default app;