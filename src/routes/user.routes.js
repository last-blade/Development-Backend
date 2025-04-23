import { Router } from "express";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { authentication } from "../middlewares/authentication.middleware.js";

const router = Router();

router.route("/login").post(authentication, loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(authentication, logoutUser);

export default router;