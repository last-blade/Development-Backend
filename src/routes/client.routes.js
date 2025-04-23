import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createClient } from "../controllers/clientDataControllers/createClient.controller.js";

const router = Router();

router.route("/create-client").post(authentication, createClient);

export default router;