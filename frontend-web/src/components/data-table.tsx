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
import { useState, useRef, useEffect } from "react";
import { SearchIcon } from "@/assets/svg/SvgIcons";
import DebouncedInput from "./DebouncedInput";
import { DateStructure } from "@/pages/Home";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const [shouldPrint, setShouldPrint] = useState(false);

  const pdfRef = useRef<HTMLTableElement>(null);

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
    const newNumber = parseInt(e.target.value);
    if (newNumber === 13) {
      return setDate((prevState) => ({ ...prevState, mes: 1 }));
    }
    if (newNumber === 0) {
      return setDate((prevState) => ({ ...prevState, mes: 12 }));
    }
    setDate((prevState) => ({
      ...prevState,
      [e.target.name]: newNumber,
    }));
  };

  const imprimirPlanilla = () => {
    const input = pdfRef.current;
    if (input) {
      // html2canvas(input).then((canvas) => {
      //   const imgData = canvas.toDataURL('image/png')
      //   const pdf = new jsPDF('p', 'mm', 'a4', false)
      //   const pdfWidth = pdf.internal.pageSize.getWidth()
      //   const pdfHeight = pdf.internal.pageSize.getHeight()
      //   const imgWidth = canvas.width
      //   const imgHeight = canvas.height
      //   const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      //   const imgX = (pdfWidth - imgWidth * ratio) / 2
      //   const imgY = 30
      //   pdf.addImage(
      //     imgData,
      //     'PNG',
      //     imgX,
      //     imgY,
      //     imgWidth * ratio,
      //     imgHeight * ratio
      //   )
      //   pdf.save('planilla')
      // })
      html2canvas(input, { logging: true, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const pdf = new jsPDF("p", "mm", "a4", false);
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("planilla.pdf");
      });
    }
  };

  useEffect(() => {
    if (shouldPrint) {
      imprimirPlanilla();
      table.setPageSize(10);
      setShouldPrint(false);
    }
  }, [shouldPrint]);

  return (
    <div className="w-[90%] mx-auto min-h-[60%]">
      <div className="flex sm:flex-row sm:gap-0 gap-8 flex-col sm:justify-center justify-end items-center sm:items-end w-full mb-3">
        <div className="flex items-center justify-center sm:justify-start gap-1 w-[65%]">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-48 transition-all focus:w-56 duration-300 border-indigo-500"
            placeholder="Busca algun viaje..."
          />
        </div>
        <div className="flex justify-center sm:flex-row sm:gap-0 gap-8 flex-col sm:justify-between w-full">
          <div className="flex items-end justify-center sm:justify-normal gap-4">
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
              setShouldPrint(true);
            }}
            className="mx-auto sm:mx-0 bg-white md:px-4 md:py-2 px-2 py-2 rounded-lg md:text-xl text-base border-[1px] 
            border-[#725ba7] text-[#725ba7] hover:bg-[#725ba7] hover:text-white transition-all duration-300 font-bold sm:w-auto w-[50%]"
          >
            Descargar planilla
          </button>
        </div>
      </div>
      <div className={`rounded-md border`}>
        <Table ref={pdfRef}>
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
            <div className="sm:block hidden"></div>
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
