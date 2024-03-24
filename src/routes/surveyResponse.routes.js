import { Router } from "express";
import { saveSurveyResponse } from "../controllers/surveyResponse.controllers.js";

const router = Router();

router.route("/").post(saveSurveyResponse);

export default router;