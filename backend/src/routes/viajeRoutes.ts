import express from "express";
import { checkAuth } from "../middlewares";
import { crearViaje, getViaje, getViajesPagination, getViajesPorMesYAnio, modificarViaje } from "../controllers/ViajeController";
import { viajeSchema } from "../controllers/schemas";
const router = express.Router();

router.get("/asd", getViajesPorMesYAnio)

router.post("/", checkAuth, viajeSchema, crearViaje);
router.put("/:nro_viaje", checkAuth, viajeSchema, modificarViaje);
router.get("/", checkAuth, getViajesPagination);
router.get("/:nro_viaje", checkAuth, getViaje);


export default router;
