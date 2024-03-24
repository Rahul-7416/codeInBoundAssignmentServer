import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser"; 
import questionRouter from "./routes/question.routes.js";
import customerRouter from "./routes/customerSession.routes.js";
import responseRouter from "./routes/surveyResponse.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use((req, res, next) => {
    req.sessionId = uuidv4();
    next();
})

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"));

app.use(cookieParser());

// question routes
app.use("/api/v1/questions", questionRouter );

// customerSession routes
app.use("/api/v1/sessions", customerRouter);

// surveyResponse routes
app.use("/api/v1/responses", responseRouter);

export { app };