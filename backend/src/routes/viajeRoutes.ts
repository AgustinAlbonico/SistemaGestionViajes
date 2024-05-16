import express from "express";
import { checkAuth } from "../middlewares";
import {
  crearViaje,
  getViaje,
  getViajesPagination,
  modificarViaje,
} from "../controllers/ViajeController";
import { viajeSchema } from "../controllers/schemas";
const router = express.Router();

router.get("/", checkAuth, getViajesPagination);
router.post("/", checkAuth, crearViaje);

router.get("/:nro_viaje", checkAuth, getViaje);
router.put("/:nro_viaje", checkAuth, viajeSchema, modificarViaje);

export default router;
