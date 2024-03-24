import { Router } from "express";
import {
    postQuestion,
    getAllQuestions,
} from "../controllers/questions.controllers.js";

const router = Router();

router.route("/add-question").post(postQuestion);

router.route("/get-all-questions").get(getAllQuestions);


export default router;

