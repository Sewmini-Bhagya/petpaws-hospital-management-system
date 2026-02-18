import express from "express";
import { addPet } from "../controllers/pet.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getMyPets } from "../controllers/pet.controller.js";


const router = express.Router();



router.post(
  "/",
  verifyToken,
  authorizeRoles("client"),
  addPet
);

router.get(
  "/my",
  verifyToken,
  authorizeRoles("client"),
  getMyPets
);


export default router;
