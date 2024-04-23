import express from "express";
const router = express.Router();
import { loginAdmin } from "../controllers/AuthAdminController";
import { loginSchema } from "../controllers/schemas";

router.post("/login", loginSchema, loginAdmin);

export default router;