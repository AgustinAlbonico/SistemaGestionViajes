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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  isError: boolean;
}

export function DataTableSecundaria<TData, TValue>({
  columns,
  data,
  isLoading,
  isError,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
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
      </div>
    </div>
  );
}
