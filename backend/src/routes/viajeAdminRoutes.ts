import express from "express";
import { checkAuthAdmin } from "../middlewares";
import { getViajesPorMesYAnio } from "../controllers/ViajeController";

const router = express.Router();

router.get("/aniomes", checkAuthAdmin, getViajesPorMesYAnio)

export default router;
