import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SpinnerCircular } from "spinners-react";
import { useState, useRef } from "react";
import { SearchIcon } from "@/assets/svg/SvgIcons";
import DebouncedInput from "./DebouncedInput";
import { DateStructure } from "@/pages/Home";
import { useReactToPrint } from "react-to-print";
import { notifyError } from "@/helpers/toastFunction";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  date: DateStructure;
  setDate: React.Dispatch<React.SetStateAction<DateStructure>>;
  isError: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  date,
  setDate,
  isError,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const componentPdf = useRef();

  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: Number.parseInt(e.target.value),
    }));
  };

  const imprimirPlanilla = useReactToPrint({
    content: () => {
      if (table.getRowCount() > 0) {
        componentPdf.current;
      } else {
        notifyError("No se puede imprimir una planilla vacia!");
      }
      return null;
    },
    onAfterPrint: () => {
      table.setPageSize(10);
    },
  });

  return (
    <div className="w-[90%] mx-auto min-h-[60%]">
      <div className="flex w-full mb-3">
        <div className="flex items-center gap-1 w-[65%]">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-48 transition-all focus:w-56 duration-300 border-indigo-500"
            placeholder="Busca algun viaje..."
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-end gap-4">
            <div className="flex items-end gap-3">
              <label htmlFor="mes" className="text-xl">
                Mes:
              </label>
              <input
                type="number"
                name="mes"
                placeholder="Mes"
                id="mes"
                className="pl-1 bg-transparent outline-none border-b-2 w-10 duration-300 border-indigo-500"
                value={date.mes}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-end gap-3">
              <label htmlFor="anio" className="text-xl">
                Año:
              </label>
              <input
                type="number"
                name="anio"
                placeholder="Año"
                id="anio"
                className="pl-1 bg-transparent outline-none border-b-2 w-16 duration-300 border-indigo-500"
                value={date.anio}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            onClick={() => {
              table.setPageSize(table.getRowCount());
              imprimirPlanilla();
            }}
            className="bg-white  px-4 py-2 rounded-lg text-xl border-[1px] border-[#725ba7] text-[#725ba7] hover:bg-[#725ba7] hover:text-white transition-all duration-300 font-bold"
          >
            Descargar planilla
          </button>
        </div>
      </div>
      <div className={`rounded-md border`}>
        <Table ref={componentPdf}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center font-bold text-lg text-[#820486] border-b-[1px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              table.getRowModel().rows?.length > 0 && !isError ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-center"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center font-bold text-xl py-8"
                  >
                    No se encuentran viajes para el mes y año seleccionados.
                  </TableCell>
                </TableRow>
              ) : (
                <div>error</div>
              )
            ) : (
              <TableRow className="w-full">
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center"
                >
                  <SpinnerCircular
                    className="mx-auto w-12 h-12"
                    color="#820486"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {!isLoading && table.getRowCount() > 0 && (
          <div className="flex justify-around items-center border-t-[1px] py-3">
            <div></div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
                className="py-2 px-4 border border-gray-300 disabled:opacity-30 rounded-md"
              >
                <IoMdArrowDropleft size={24} />
              </button>
              <span className="flex items-center gap-1 text-lg">
                <div>Página</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} de{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <button
                onClick={() => {
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
                className="py-2 px-4 border border-gray-300 disabled:opacity-30 rounded-md"
              >
                <IoMdArrowDropright size={24} />
              </button>
            </div>
            <p className="text-lg">
              Total viajes: <strong>{table.getRowCount()}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
