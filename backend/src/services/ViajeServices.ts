import { PrismaClient } from '@prisma/client'
import { ViajeModel } from '../models/viaje.model'
// import { metodoPago } from "../models/metodoPago.model";
const prisma = new PrismaClient()
import moment from 'moment'

export const createViajeService = (viaje: ViajeModel) => {
  const {
    cantKms,
    destino,
    fecha_viaje,
    marca,
    modelo,
    movimiento,
    origen,
    particular,
    patente,
    username,
    observaciones,
    excedente,
    metodosPago,
  } = viaje
  const parsedParticular = Number(particular)
  const viajeCreado = prisma.viaje.create({
    data: {
      cantKms,
      destino,
      origen,
      observaciones,
      fecha_viaje,
      marca,
      modelo,
      movimiento,
      particular: parsedParticular,
      patente,
      camionero: { connect: { username } },
      excedente,
      fecha_hora_guardado: new Date(),
      viaje_metodopago: {
        create: metodosPago?.map((mp) => ({
          metodo_pago: { connect: { id_metodoPago: mp.id_metodoPago } },
          importe: mp.importe,
        })),
      },
    },
  })
  return viajeCreado
}

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
        fecha_viaje: 'desc',
      },
      { fecha_hora_guardado: 'desc' },
    ],
    take: limit,
    skip,
  })
}

export const getCantViajesService = (username: string) => {
  return prisma.viaje.count({ where: { username } })
}

export const getViajeService = (nro_viaje: number) => {
  return prisma.viaje.findFirst({
    where: {
      nro_viaje,
    },
    include: {
      viaje_metodopago: { select: { id_metodoPago: true, importe: true } },
    },
  })
}

export const getViajesPorMesYAnioService = (mes: number, anio: number) => {
  // return prisma.$queryRaw`SELECT v.nro_viaje, v.fecha_viaje, v.patente, v.particular, v.origen, v.destino, v.movimiento, CONCAT(c.nombre, " ", c.apellido) as nombre_camionero, mp.descripcion as metodoPago
  //   FROM viaje v
  //     INNER JOIN camionero c on c.username = v.username
  //     INNER JOIN viaje_metodopago vmp on vmp.nro_viaje = v.nro_viaje
  //     INNER JOIN metodo_pago mp on mp.id_metodoPago = vmp.id_metodoPago
  // WHERE MONTH(v.fecha_viaje) = ${mes} AND YEAR(v.fecha_viaje) = ${anio}
  // ORDER BY v.fecha_viaje DESC;`;

  //DADO EL MES Y AÑO BUSCO TODOS LOS VIAJES CON SU CAMIONERO Y METODOS DE PAGO
  const fechaInicio = moment.utc(`${anio}-${mes}-01`, 'YYYY-MM-DD').toDate()
  const fechaFin = moment.utc(fechaInicio).endOf('month').toDate()

  return prisma.viaje.findMany({
    where: {
      fecha_viaje: {
        gte: fechaInicio,
        lte: fechaFin,
      },
    },
    include: {
      camionero: true,
      viaje_metodopago: {
        select: {importe: true, metodo_pago: { select: {descripcion: true}}},
        where: { importe: { gt: 0 } },
      },
    },
    orderBy: { fecha_viaje: 'desc' },
  })
}

export const getInfoSecundaria = (mes: number, anio: number) => {
  return prisma.$queryRaw`
    SELECT
      CONCAT(c.nombre, ' ', c.apellido) AS nombreCamionero,
      ROUND(SUM(vu.cantKms), 2) AS cantKmsRecorridos,
      CAST(COUNT(*) AS CHAR) AS cantViajesTotales,
      CAST(SUM(vu.particular) AS CHAR) AS cantViajesParticulares,
      CAST(SUM(COALESCE(p.metodopago1, 0)) AS CHAR) AS efectivo,
      CAST(SUM(COALESCE(p.metodopago2, 0)) AS CHAR) AS transferencia,
      CAST(SUM(COALESCE(p.metodopago3, 0)) AS CHAR) AS otros
    FROM (
      -- viajes únicos (para evitar el triple conteo)
      SELECT
        v.nro_viaje,
        v.username,
        v.cantKms,
        v.particular
      FROM viaje v
      WHERE MONTH(v.fecha_viaje) = ${mes}
        AND YEAR(v.fecha_viaje) = ${anio}
      GROUP BY
        v.nro_viaje,
        v.username,
        v.cantKms,
        v.particular
    ) vu
    INNER JOIN camionero c
      ON vu.username = c.username
    LEFT JOIN (
      -- métodos de pago pivoteados por nro_viaje
      SELECT
        pagos.nro_viaje,
        SUM(CASE WHEN pagos.id_metodoPago = 1 THEN pagos.total_importe ELSE 0 END) AS metodopago1,
        SUM(CASE WHEN pagos.id_metodoPago = 2 THEN pagos.total_importe ELSE 0 END) AS metodopago2,
        SUM(CASE WHEN pagos.id_metodoPago = 3 THEN pagos.total_importe ELSE 0 END) AS metodopago3
      FROM (
        SELECT
          vmp.nro_viaje,
          vmp.id_metodoPago,
          SUM(vmp.importe) AS total_importe
        FROM viaje v
        INNER JOIN viaje_metodopago vmp
          ON vmp.nro_viaje = v.nro_viaje
        WHERE MONTH(v.fecha_viaje) = ${mes}
          AND YEAR(v.fecha_viaje) = ${anio}
        GROUP BY
          vmp.nro_viaje,
          vmp.id_metodoPago
      ) pagos
      GROUP BY pagos.nro_viaje
    ) p
      ON vu.nro_viaje = p.nro_viaje
    GROUP BY
      vu.username, c.nombre, c.apellido
  `;
};


export const eliminarMetodosPagoParaUnViaje = (nro_viaje: number) => {
  return prisma.viaje_metodopago.deleteMany({ where: { nro_viaje } })
}

// export const crearMetodosDePagoViaje = (
//   nro_viaje: number,
//   metodosPago: metodoPago[]
// ) => {
//   const viaje_metodosPago = metodosPago.map((metodo) => ({
//     nro_viaje,
//     id_metodoPago: metodo.id_metodoPago,
//   }));

//   console.log(viaje_metodosPago);

//   return prisma.viaje_metodopago.createMany({ data: viaje_metodosPago });
// };

export const updateViajeService = (viaje: ViajeModel, nro_viaje: number) => {
  const {
    cantKms,
    destino,
    fecha_viaje,
    marca,
    modelo,
    movimiento,
    origen,
    particular,
    metodosPago,
    patente,
    username,
    observaciones,
    excedente,
  } = viaje

  const parsedParticular = Number(particular)

  return prisma.viaje.update({
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
      modelo,
      movimiento,
      excedente,
      patente,
      particular: parsedParticular,
      camionero: { connect: { username } },
      viaje_metodopago: {
        updateMany: metodosPago.map((mp) => ({
          data: {
            importe: mp.importe,
          },
          where: {
            id_metodoPago: mp.id_metodoPago,
          },
        })),
      },
    },
  })
}
