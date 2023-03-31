// importing libraries
import express from "express";
const router = express.Router();

// importing controller
import { securedResource, unsecuredResource } from "../controllers/test.js";

// importing middleware
import { allAuth } from "../middleware/auth.js";

// GET: get secured resource
router.get("/securedResource", allAuth, securedResource);

// GET: get unsecured resource
router.get("/unsecuredResource", allAuth, unsecuredResource);

export default router;
