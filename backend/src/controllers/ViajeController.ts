import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ViajeModel } from "../models/viaje.model";
import {
  createViajeService,
  getCantViajesService,
  getViajeService,
  getViajesPorMesYAnioService,
  getViajesService,
  updateViajeService,
} from "../services/ViajeServices";
import moment from "moment";

export const crearViaje = async (req: Request, res: Response) => {
  const resultValidaton = validationResult(req);
  const hasError = !resultValidaton.isEmpty();

  if (hasError)
    return res.status(400).json({ message: resultValidaton.array()[0].msg });

  const {
    patente,
    fecha_viaje,
    marca,
    modelo,
    particular,
    origen,
    destino,
    metodoPago,
    cantKms,
    movimiento,
  } = req.body;

  const fecha = moment(fecha_viaje, "DD/MM/YYYY", true);

  if (fecha.isAfter(moment(), "day"))
    return res
      .status(400)
      .json({ message: "No se puede crear un viaje con fecha mayor a hoy" });

  const [day, month, year] = fecha_viaje.split("/");

  const inputViaje: ViajeModel = {
    patente,
    particular,
    marca,
    modelo,
    fecha_viaje: moment(`${day}-${month}-${year}`, "DD-MM-YYYY").toISOString(),
    origen,
    destino,
    metodoPago,
    cantKms,
    movimiento,
    observaciones: req?.body?.observaciones,
    username: req.username,
  };

  try {
    await createViajeService(inputViaje);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

export const modificarViaje = async (req: Request, res: Response) => {
  const resultValidaton = validationResult(req);
  const hasError = !resultValidaton.isEmpty();

  if (hasError)
    return res.status(400).json({ message: resultValidaton.array()[0].msg });

  const nro_viaje: number = Number.parseInt(req.params.nro_viaje);

  if (!nro_viaje)
    return res.status(400).json({ message: "Nro. de viaje erroneo" });

  const {
    patente,
    fecha_viaje,
    marca,
    modelo,
    particular,
    origen,
    destino,
    metodoPago,
    cantKms,
    movimiento,
  } = req.body;

  const [day, month, year] = fecha_viaje.split("/");
  const fecAux = moment(`${day}-${month}-${year}`, "DD-MM-YYYY").toISOString();

  const inputViaje: ViajeModel = {
    patente,
    particular,
    marca,
    modelo,
    fecha_viaje: fecAux,
    origen,
    destino,
    metodoPago,
    cantKms,
    movimiento,
    observaciones: req?.body?.observaciones,
    username: req.username,
  };

  try {
    await updateViajeService(inputViaje, nro_viaje);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error al modificar viaje" });
  }
};

export const getViajesPagination = async (req: Request, res: Response) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const cantTotalViajes: number = (await getCantViajesService(
      req.username
    )) as number;

    const parsedLimit: number = Number.parseInt(limit as string);
    const parsedPage: number = Number.parseInt(page as string);

    const skip: number = (parsedPage - 1) * parsedLimit;

    const viajes = await getViajesService(req.username, parsedLimit, skip);

    const cantPages: number = Math.ceil(cantTotalViajes / parsedLimit);

    return res.status(200).json({
      info: { count: cantTotalViajes, pages: cantPages },
      results: viajes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getViajesPorMesYAnio = async (req: Request, res: Response) => {
  try {
    const {mes, anio} = req.query;
    const parsedMes = Number.parseInt(mes as string);
    const parserAnio = Number.parseInt(anio as string);

    const viajes = await getViajesPorMesYAnioService(parsedMes, parserAnio);

    // throw new Error('error xd')

    return res.status(200).json(viajes)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Error en el servidor"})
  }
};

export const getViaje = async (req: Request, res: Response) => {
  const nro_viaje: number = Number.parseInt(req.params.nro_viaje);
  try {
    const viaje = await getViajeService(nro_viaje);

    return res.status(200).json(viaje);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
