import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createClient } from "../controllers/clientDataControllers/createClient.controller.js";
import { viewClient } from "../controllers/clientDataControllers/viewClient.controller.js";

const router = Router();

router.route("/create-client").post(authentication, createClient);
router.route("/view-client/:clientId").get(authentication, viewClient)

export default router;