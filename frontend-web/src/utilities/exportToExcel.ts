import { ViajeModel } from "@/models/viaje";
import * as XLSX from "xlsx-js-style";
import { DateStructure } from "@/pages/Home";

const exportToExcel = (data: ViajeModel[], date: DateStructure) => {
  if (!data || data.length === 0) return;

  const fileName = `Planilla viajes ${date.mes}-${date.anio}.xlsx`;

  const formatDate = (fecha: string) => {
    const [year, month, day] = fecha.split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  const formattedData = data.map(
    ({
      fecha_viaje,
      cantKms,
      destino,
      metodosPago,
      movimiento,
      nombre_camionero,
      origen,
      particular,
      patente,
      observaciones,
    }) => ({
      Fecha: formatDate(fecha_viaje),
      Camionero: nombre_camionero,
      "Métodos de Pago": metodosPago
        .map(
          (mp) =>
            `${mp.descripcion}: $${mp.importe.toLocaleString("es-AR", {
              minimumFractionDigits: 0,
            })}`
        )
        .join("\n"),
      Kilómetros: cantKms,
      Origen: origen,
      Destino: destino,
      Movimiento: movimiento,
      Observaciones: observaciones,
      Patente: patente,
      Particular: particular ? "✓" : "X",
    })
  );

  // Crear la hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Aplicar estilos a todas las celdas
  Object.keys(worksheet).forEach((cell) => {
    if (!cell.startsWith("!")) {
      (worksheet[cell] as any).s = {
        alignment: { wrapText: true, vertical: "center" },
        font: { name: "Arial", sz: 11 },
      };
    }
  });

  const abecedario = "ABCDEFGHIJ";

  //Estilos titulos columnas
  for (let j = 65; j <= 74; j++) {
    worksheet[`${String.fromCharCode(j)}1`].s = {
      font: {
        bold: true,
        sz: 12,
        name: "Arial",
        wrapText: false,
      },
      alignment: {
        vertical: "center",
      },
    };
  }

  //Centro columna fecha, cantKms y particular
  for (let i = 2; i <= formattedData.length + 1; i++) {
    worksheet[`A${i}`].s = {
      font: {
        sz: 11,
        name: "Arial",
        wrapText: false,
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };

    worksheet[`D${i}`].s = {
      font: {
        sz: 11,
        name: "Arial",
        wrapText: false,
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };

    worksheet[`J${i}`].s = {
      font: {
        sz: 11,
        name: "Arial",
        wrapText: false,
        bold: true,
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },
    };
  }

  for (let i of abecedario) {
    for (let j = 2; j < formattedData.length + 1; j++) {
      if (i !== "A" && i !== "D" && i !== "J" && i !== "H") {
        worksheet[`${i}${j}`].s = {
          font: {
            bold: false,
            sz: 11,
            name: "Arial",
            wrapText: false,
          },
        };
      } else if (i == "H") {
        worksheet[`H${j}`].s = {
          font: {
            bold: false,
            sz: 11,
            name: "Arial",
          },
          alignment: {
            wrapText: true,
          },
        };
      }
    }
  }

  //Ajusto ancho columnas
  const getAutoColumnWidths = (
    data: Record<string, any>[]
  ): { wch: number }[] => {
    // Convertir objetos en arrays de valores para medir el ancho
    const arrayData = data.map((row) => Object.values(row));

    return arrayData[0].map((_, colIndex) => ({
      wch:
        Math.max(
          ...arrayData.map((row) => row[colIndex]?.toString().length || 0)
        ) + 5,
    }));
  };
  worksheet["!cols"] = getAutoColumnWidths(formattedData);

  // Crear el workbook y agregar la hoja de datos
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Exportar el archivo
  XLSX.writeFile(workbook, fileName);
};

export default exportToExcel;
