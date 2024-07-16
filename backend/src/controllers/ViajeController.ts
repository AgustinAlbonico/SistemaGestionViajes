import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ViajeModel } from "../models/viaje.model";
import {
  createViajeService,
  getCantViajesService,
  getInfoSecundaria,
  getViajeService,
  getViajesPorMesYAnioService,
  getViajesService,
  updateViajeService,
} from "../services/ViajeServices";
import moment from "moment";
import { CustomUserRequest } from "../models/customRequest.model";

export const crearViaje = async (req: CustomUserRequest, res: Response) => {
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
    metodosPago,
    cantKms,
    movimiento,
    observaciones,
    excedente,
  } = req.body;

  const fecha = moment.utc(fecha_viaje, "DD/MM/YYYY");

  if (fecha.isAfter(moment(), "day"))
    return res
      .status(400)
      .json({ message: "No se puede crear un viaje con fecha mayor a hoy" });

  // const [day, month, year] = fecha_viaje.split("/");

  // //Agrego un dia pq la verga de prisma o mysql me corren todo un dia atras
  // const fecha_convertida = moment(`${day}-${month}-${year}`, "DD-MM-YYYY").add(
  //   1,
  //   "day"
  // );

  const inputViaje: ViajeModel = {
    patente,
    particular,
    marca,
    modelo,
    fecha_viaje: fecha.toISOString(),
    origen,
    destino,
    metodosPago,
    cantKms,
    movimiento,
    observaciones: observaciones || null,
    excedente,
    username: req.username,
  };

  try {
    await createViajeService(inputViaje);

    return res.status(200).json({ success: true })
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  }
};

export const modificarViaje = async (req: CustomUserRequest, res: Response) => {
  const resultValidaton = validationResult(req);
  const hasError = !resultValidaton.isEmpty();

  if (hasError)
    return res.status(400).json({ message: resultValidaton.array()[0].msg });

  const nro_viaje: number = Number.parseInt(req.params.nro_viaje);

  if (!nro_viaje)
    return res.status(400).json({ message: "Nro. de viaje erroneo" });

  console.log(req.body)

  const {
    patente,
    fecha_viaje,
    marca,
    modelo,
    particular,
    origen,
    destino,
    metodosPago,
    cantKms,
    movimiento,
    excedente,
    observaciones,
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
    cantKms,
    movimiento,
    observaciones,
    metodosPago,
    excedente,
    username: req.username,
  };

  try {
    await updateViajeService(inputViaje, nro_viaje);

    // await eliminarMetodosPagoParaUnViaje(nro_viaje);

    // await crearMetodosDePagoViaje(nro_viaje, metodosPago);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error al modificar viaje" });
  }
};

export const getViajesPagination = async (
  req: CustomUserRequest,
  res: Response
) => {
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
    console.log("error", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getViajesPorMesYAnio = async (req: Request, res: Response) => {
  try {
    const { mes, anio } = req.query;
    const parsedMes = Number.parseInt(mes as string);
    const parserAnio = Number.parseInt(anio as string);

    if(parsedMes < 1 || parsedMes > 12) return res.status(400).json({message: 'Mes erroneo'})

    const viajes = await getViajesPorMesYAnioService(parsedMes, parserAnio);

    const viajesTransformados = viajes.map((viaje) => {
      const metodosPago = viaje.viaje_metodopago.map((vm) => ({
        importe: vm.importe,
        descripcion: vm.metodo_pago.descripcion
      }));
      return {
        nro_viaje: viaje.nro_viaje,
        fecha_viaje: viaje.fecha_viaje,
        particular: viaje.particular,
        cantKms: viaje.cantKms,
        origen: viaje.origen,
        destino: viaje.destino,
        movimiento: viaje.movimiento,
        observaciones: viaje.observaciones,
        patente: viaje.patente,
        nombre_camionero: `${viaje.camionero.nombre} ${viaje.camionero.apellido}`,
        metodosPago: metodosPago,
      };
    });

    const datosSecundarios = await getInfoSecundaria(parsedMes, parserAnio)
   
    return res
      .status(200)
      .json({ viajesTransformados, datosSecundarios});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

// export const imprimirViajesPorMesYAnio = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { mes, anio } = req.query;
//     const parsedMes = Number.parseInt(mes as string);
//     const parserAnio = Number.parseInt(anio as string);

//     const viajes = await getViajesPorMesYAnioService(parsedMes, parserAnio);

//     const doc = new PDF({ bufferPages: true });

//     const filename = `planilla-viajes-${mes
//       ?.toString()
//       .padStart(2, "0")}/${anio}.pdf`;

//     const stream = res.writeHead(200, {
//       "Content-Type": "application/pdf",
//       "content-disposition": `attachment; filename=${filename}`,
//     });

//     doc.on("data", (data) => stream.write(data));
//     doc.on("end", () => stream.end());

//     doc.addTable(
//       [
//         {
//           key: "nro_viaje",
//           label: "Nro. viaje",
//           align: "center",
//         },
//         {
//           key: "fecha_viaje",
//           label: "Fecha",
//           align: "center",
//         },
//         {
//           key: "nombre_camionero",
//           label: "Camionero",
//           align: "center",
//         },
//         {
//           key: "patente",
//           label: "Patente",
//           align: "center",
//         },
//         {
//           key: "movimiento",
//           label: "Movimiento",
//           align: "center",
//         },
//         {
//           key: "origen",
//           label: "Origen",
//           align: "center",
//         },
//         {
//           key: "destino",
//           label: "Destino",
//           align: "center",
//         },

//         {
//           key: "particular",
//           label: "Particular",
//           align: "center",
//         },
//       ],
//       viajes,
//       {
//         border: null,
//         width: "fill-body",
//         striped: true,
//         stripedColors: ['#f6f6f6', '#d6c4dd'],
//         cellsPadding: 10,
//         marginLeft: 45,
//         marginRight: 45,
//         headAlign: "center",
//       }
//     );

//     console.log(doc)

//     doc.render()

//     doc.end();

//     //return res.status(200).json(viajes);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Error en el servidor" });
//   }
// };

export const getViaje = async (req: Request, res: Response) => {
  const nro_viaje: number = Number.parseInt(req.params.nro_viaje);
  try {
    const viaje = await getViajeService(nro_viaje);

    return res.status(200).json(viaje);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
