import { MetodoPagoModel, ViajeModel } from '@/models/viaje'
import { ColumnDef } from '@tanstack/react-table'
import { PiArrowsDownUp } from 'react-icons/pi'
import { Button } from './ui/button'
import { PlanillaSecundariaModel } from '@/models/planillaSecundaria'

export const columnsPrincipal: ColumnDef<ViajeModel>[] = [
  {
    accessorKey: 'fecha_viaje',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:opacity-60 duration-500 transition-all'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className='text-center font-bold text-lg text-[#820486]'>Fecha</p>
          <PiArrowsDownUp className='ml-2 text-[#820486]' size={20} />
        </Button>
      )
    },
    cell: (item) => {
      const fechaUnparsed = item.getValue() as string
      const fecha = new Date(fechaUnparsed)
      return <span>{fecha.toISOString().split('T')[0]}</span>
    },
  },
  {
    accessorKey: 'nombre_camionero',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:opacity-60 duration-500 transition-all'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className='text-center font-bold text-lg text-[#820486]'>
            Camionero
          </p>
          <PiArrowsDownUp className='ml-2 text-[#820486]' size={20} />
        </Button>
      )
    },
    cell: (item) => (
      <span className='font-bold'>{item.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'metodosPago',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:opacity-60 duration-500 transition-all'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className='text-center font-bold text-lg text-[#820486]'>
            Metodo pago
          </p>
          <PiArrowsDownUp className='ml-2 text-[#820486]' size={20} />
        </Button>
      )
    },
    cell: (item) =>
      (item.getValue() as MetodoPagoModel[])?.map((metodo, index) => (
        <div className='text-center'>
          <span key={metodo.id_metodoPago} className='font-bold'>
            {metodo.descripcion.charAt(0).toUpperCase() +
              metodo.descripcion.slice(1).toLowerCase() + ': '}
          </span>
          <span key={metodo.id_metodoPago} className=''>
            {metodo.importe}{" "}
            <span className='font-bold'>
            $
            </span>
          </span>
          {index !== 0 && <br />}
        </div>
      )),
  },
  { accessorKey: 'cantKms', header: 'Cant. kms' },
  { accessorKey: 'origen', header: 'Origen' },
  { accessorKey: 'destino', header: 'Destino' },
  { accessorKey: 'movimiento', header: 'Movimiento' },
  { accessorKey: 'patente', header: 'Patente' },
  {
    accessorKey: 'particular',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:opacity-60 duration-500 transition-all'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className='text-center font-bold text-lg text-[#820486]'>
            Particular?
          </p>
          <PiArrowsDownUp className='ml-2 text-[#820486]' size={20} />
        </Button>
      )
    },
    cell: (item) => {
      if (item.getValue() == 0) {
        return <span className='font-bold text-xl'>X</span>
      } else {
        return <span className='font-bold text-xl'>✓</span>
      }
    },
  },
]

export const columnsSecundario: ColumnDef<PlanillaSecundariaModel>[] = [
  {
    accessorKey: 'nombreCamionero',
    header: 'Camionero',
    cell: (item) => (
      <span className='font-bold'>{item.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'cantKmsRecorridos',
    header: 'Cant. Kms. Recorridos',
    cell: (item) => <span>{Number(item.getValue()) / 3}</span>,
  },
  {
    accessorKey: 'cantViajesParticulares',
    header: 'Cant. Viajes Particulares',
    cell: (item) => <span>{Number(item.getValue()) / 3}</span>,
  },
  {
    accessorKey: 'cantViajesTotales',
    header: 'Cant. Viajes Totales',
    cell: (item) => <span>{Number(item.getValue()) / 3}</span>,
  },
  {
    accessorKey: 'efectivo',
    header: 'Efectivo',
    cell: (item) => {
      return (
        <span>
          {Math.round(Number(item.getValue() as string) * 10) / 10} <b>$</b>
        </span>
      )
    },
  },
  {
    accessorKey: 'transferencia',
    header: 'Transferencia',
    cell: (item) => {
      return (
        <span>
          {Math.round(Number(item.getValue() as string) * 10) / 10} <b>$</b>
        </span>
      )
    },
  },
  {
    accessorKey: 'otros',
    header: 'Otros',
    cell: (item) => {
      return (
        <span>
          {Math.round(Number(item.getValue() as string) * 10) / 10} <b>$</b>
        </span>
      )
    },
  },
]
