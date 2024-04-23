import { ViajeModel } from "@/models/viaje";
import { ColumnDef } from "@tanstack/react-table";
import { RxCross2, RxCheck } from "react-icons/rx";
import { PiArrowsDownUp } from "react-icons/pi";
import { Button } from "./ui/button";


export const columns: ColumnDef<ViajeModel>[] = [
  { accessorKey: "nro_viaje", header: "Nro. Viaje" },
  {
    accessorKey: "fecha_viaje",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:opacity-60 duration-500 transition-all"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-center font-bold text-lg text-[#820486]">Fecha</p>
          <PiArrowsDownUp className="ml-2 text-[#820486]" size={20}/>
        </Button>
      )
    },
    cell: (item) => {
      const fechaUnparsed = item.getValue() as string;
      const fecha = new Date(fechaUnparsed);
      return <span>{fecha.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "nombre_camionero",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:opacity-60 duration-500 transition-all"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-center font-bold text-lg text-[#820486]">Camionero</p>
          <PiArrowsDownUp className="ml-2 text-[#820486]" size={20}/>
        </Button>
      )
    },
  },
  { accessorKey: "origen", header: "Origen" },
  { accessorKey: "destino", header: "Destino" },
  { accessorKey: "movimiento", header: "Movimiento" },
  { accessorKey: "patente", header: "Patente" },
  {
    accessorKey: "particular",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:opacity-60 duration-500 transition-all"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="text-center font-bold text-lg text-[#820486]">Particular?</p>
          <PiArrowsDownUp className="ml-2 text-[#820486]" size={20} />
        </Button>
      )
    },
    cell: (item) => {
      if (item.getValue()) {
        return <RxCross2 size={24} className="mx-auto"/>;
      } else {
        return <RxCheck size={24} className="mx-auto"/>;
      }
    },
  },
];
