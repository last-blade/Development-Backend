import { Router } from "express";
import { authentication } from "../middlewares/authentication.middleware.js";
import { createClient } from "../controllers/clientDataControllers/createClient.controller.js";
import { viewClient } from "../controllers/clientDataControllers/viewClient.controller.js";
import { editClient } from "../controllers/clientDataControllers/editClient.controller.js";
import { deleteClient } from "../controllers/clientDataControllers/deleteClient.controller.js";

const router = Router();

router.route("/create-client").post(authentication, createClient);
router.route("/view-client/:clientId").get(authentication, viewClient)
router.route("/edit-client/:clientId").put(authentication, editClient);
router.route("/delete-client/:clientId").delete(authentication, deleteClient);

export default router;