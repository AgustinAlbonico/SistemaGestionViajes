import express from "express";
const router = express.Router();
import { loggedUser, login } from "../controllers/AuthController";
import { loginSchema } from "../controllers/schemas";

router.post("/login", loginSchema, login);
router.get("/users", loggedUser);

export default router;
