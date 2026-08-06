import express from "express";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import cors from 'cors';

dotenv.config();

const app = express();

const normalizeOrigin = (origin: string) => origin.trim().replace(/\/+$/, "");

const buildCorsOptions = () => {
    const allowedOrigins = (process.env.FRONTEND_URL || "")
        .split(",")
        .map((origin) => normalizeOrigin(origin))
        .filter(Boolean);

    return {
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            if (!origin) {
                callback(null, true);
                return;
            }

            const normalizedOrigin = normalizeOrigin(origin);
            const isAllowed = allowedOrigins.length === 0 || allowedOrigins.includes(normalizedOrigin);

            callback(null, isAllowed);
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
        optionsSuccessStatus: 200,
    };
};

app.use(cors(buildCorsOptions()));

app.use(express.json({
    limit: "100mb"}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", router);

export default app;