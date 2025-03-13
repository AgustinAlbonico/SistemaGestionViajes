import {
  ColumnDef,
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
import { Total } from "@/pages/Home";
import { PlanillaSecundariaModel } from "@/models/planillaSecundaria";

interface DataTableProps {
  columns: ColumnDef<PlanillaSecundariaModel>[];
  data?: PlanillaSecundariaModel[];
  isLoading: boolean;
  isError: boolean;
  total: Total;
}

export function DataTableSecundaria({
  columns,
  data,
  isLoading,
  isError,
  total,
}: DataTableProps) {
  const table = useReactTable({
    data: data || [],
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-[90%] mx-auto min-h-[60%]">
      <div className={`rounded-md border`}>
        <Table>
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
                <>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="text-center"
                    >
                      {row.getVisibleCells().map((cell) => {

                        return cell.column.id == "nombreCamionero" ? (
                          <TableCell key={cell.id}>
                            {cell.getValue() as string}
                          </TableCell>
                        ) : (
                          <TableCell key={cell.id}>
                            {`${Number(cell.getValue() as string).toLocaleString(
                              "es-AR",
                              {
                                minimumFractionDigits: 0,
                              }
                            )}`}<span className="font-bold">{" "}$</span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100">
                    <TableCell className="font-bold text-center text-xl">
                      Total:
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell className="text-center">
                      {total.efectivo.toLocaleString("es-AR", {
                        minimumFractionDigits: 0,
                      })}
                      <span className="font-bold"> $</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {total.transferencia.toLocaleString("es-AR", {
                        minimumFractionDigits: 0,
                      })}
                      <span className="font-bold"> $</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {total.otros.toLocaleString("es-AR", {
                        minimumFractionDigits: 0,
                      })}
                      <span className="font-bold"> $</span>
                    </TableCell>
                  </TableRow>
                </>
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
      </div>
    </div>
  );
}
