export type MetodoPagoModel = {
    id_metodoPago: number,
    descripcion: string,
    importe: number
}

export type ViajeModel = {
    nro_viaje: number,
    fecha_viaje: string,
    nombre_camionero: string,
    metodosPago: MetodoPagoModel[],
    cantKms: number,
    origen: string,
    destino: string,
    movimiento: string,
    patente: string,
    particular: boolean,
    observaciones?: string
}

