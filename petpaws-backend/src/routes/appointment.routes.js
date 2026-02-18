import express from "express";
import {
  bookAppointment,
  getMyAppointments,
} from "../controllers/appointment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("client"), bookAppointment);
router.get("/my", verifyToken, authorizeRoles("client"), getMyAppointments);

export default router;
