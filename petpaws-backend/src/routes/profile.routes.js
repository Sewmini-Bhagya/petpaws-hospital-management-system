import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", verifyToken, getMyProfile);
router.put("/update", verifyToken, updateMyProfile);

export default router;
