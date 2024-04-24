import express from "express";
import { checkAuth, checkAuthAdmin } from "../middlewares";
import { crearViaje, getViaje, getViajesPagination, getViajesPorMesYAnio, modificarViaje } from "../controllers/ViajeController";
import { viajeSchema } from "../controllers/schemas";
const router = express.Router();

router.get("/aniomes", checkAuthAdmin, getViajesPorMesYAnio)
// router.get("/imprimir", imprimirViajesPorMesYAnio)

router.post("/", checkAuth, viajeSchema, crearViaje);
router.put("/:nro_viaje", checkAuth, viajeSchema, modificarViaje);
router.get("/", checkAuth, getViajesPagination);
router.get("/:nro_viaje", checkAuth, getViaje);


export default router;
