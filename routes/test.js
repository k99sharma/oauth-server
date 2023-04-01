// importing libraries
import express from "express";
const router = express.Router();

// importing controller
import { securedResource, unsecuredResource } from "../controllers/test.js";

// importing middleware
import { authCheck } from "../middleware/auth.js";

// GET: get secured resource
router.get("/securedResource", authCheck, securedResource);

// GET: get unsecured resource
router.get("/unsecuredResource", unsecuredResource);

export default router;
