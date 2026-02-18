import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { changeUserRole } from "../controllers/admin.controller.js";

const router = express.Router();

router.put(
  "/users/:id/role",
  verifyToken,
  authorizeRoles("admin"),
  changeUserRole
);

export default router;
