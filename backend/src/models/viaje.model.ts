export type ViajeModel = {
    nro_viaje?: number,
    fecha_viaje: string,
    fecha_hora_guardado?: Date,
    movimiento: string,
    patente: string,
    cantKms: number,
    metodoPago: string,
    observaciones?: string,
    particular: boolean,
    origen: string,
    destino: string,
    marca: string,
    modelo: string
    username: string
}