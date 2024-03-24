import { Router } from "express";

import { createSession, updateSessionCompletion } from "../controllers/customerSession.controllers.js";

const router = Router();

router.route("/new").post(createSession);

router.route("/:sessionId").put(updateSessionCompletion);

export default router;