import { PrismaClient } from "@prisma/client";
import { ViajeModel } from "../models/viaje.model";
const prisma = new PrismaClient();

export const createViajeService = (viaje: ViajeModel) => {
  const {
    cantKms,
    destino,
    fecha_viaje,
    marca,
    metodoPago,
    modelo,
    movimiento,
    origen,
    particular,
    patente,
    username,
    observaciones,
  } = viaje;
  const parsedParticular = Number(particular);
  const viajeCreado = prisma.viaje.create({
    data: {
      cantKms,
      destino,
      origen,
      observaciones,
      fecha_viaje,
      marca,
      metodoPago,
      modelo,
      movimiento,
      particular: parsedParticular,
      patente,
      camionero: { connect: { username } },
    },
  });
  return viajeCreado;
};

export const getViajesService = (
  username: string,
  limit: number,
  skip: number
) => {
  return prisma.viaje.findMany({
    where: {
      username,
    },
    orderBy: [
      {
        fecha_viaje: "asc",
      },
      { fecha_hora_guardado: "desc" },
    ],
    take: limit,
    skip,
  });
};

export const getCantViajesService = (username: string) => {
  return prisma.viaje.count({ where: { username } });
};

export const getViajeService = (nro_viaje: number) => {
  return prisma.viaje.findFirst({
    where: {
      nro_viaje,
    },
  });
};

export const getViajesPorMesYAnioService = (mes: number, anio: number) => {
  return prisma.$queryRaw`SELECT v.nro_viaje, v.fecha_viaje, v.patente, v.particular, v.origen, v.destino, v.movimiento, CONCAT(c.nombre, " ", c.apellido) as nombre_camionero
  FROM viaje v INNER JOIN camionero c on c.username = v.username
  WHERE MONTH(v.fecha_viaje) = ${mes} AND YEAR(v.fecha_viaje) = ${anio}
  ORDER BY v.fecha_viaje DESC;`;
};

export const updateViajeService = (viaje: ViajeModel, nro_viaje: number) => {
  const {
    cantKms,
    destino,
    fecha_viaje,
    marca,
    metodoPago,
    modelo,
    movimiento,
    origen,
    particular,
    patente,
    username,
    observaciones,
  } = viaje;

  const parsedParticular = Number(particular);

  const viajeCreado = prisma.viaje.update({
    where: {
      nro_viaje,
    },
    data: {
      cantKms,
      destino,
      origen,
      observaciones,
      fecha_viaje,
      marca,
      metodoPago,
      modelo,
      movimiento,
      particular: parsedParticular,
      patente,
      camionero: { connect: { username } },
    },
  });
  return viajeCreado;
};
