import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { columnsPrincipal, columnsSecundario } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { DataTableSecundaria } from "@/components/data-table-secundaria";
import { notifyError } from "@/helpers/toastFunction";
import { removeLocalStorage } from "@/utilities/HandleLocalStorage";
import { PlanillaSecundariaModel } from "@/models/planillaSecundaria";
import { ViajeModel } from "@/models/viaje";

export interface DateStructure {
  mes: number;
  anio: number;
}

export interface Total {
  efectivo: number;
  transferencia: number;
  otros: number;
}

interface ApiResponse {
  datosSecundarios: PlanillaSecundariaModel[];
  viajesTransformados: ViajeModel[];
  message?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = `${import.meta.env.VITE_API_URL}/viaje-admin/aniomes`;

  const [date, setDate] = useState<DateStructure>({
    mes: new Date().getMonth() + 1,
    anio: new Date().getFullYear(),
  });
  const [total, setTotal] = useState<Total>({
    efectivo: 0,
    transferencia: 0,
    otros: 0,
  });

  const token = useMemo(() => {
    const storage = localStorage.getItem("auth");
    if (storage) {
      return JSON.parse(storage).token;
    }
  }, []);

  const fetchData = async () => {
    try {
      setTotal({
        efectivo: 0,
        otros: 0,
        transferencia: 0
      })

      const data = await fetch(`${API_URL}?mes=${date.mes}&anio=${date.anio}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const dataJson: ApiResponse = await data.json();

      if (!data.ok) {
        removeLocalStorage();
        navigate("/login", { replace: true });

        throw new Error(dataJson.message);
      } else {
        dataJson.datosSecundarios.forEach((camionero) => {
  
          setTotal((prevTotal) => ({          
            efectivo: Number(prevTotal.efectivo) + Number(camionero.efectivo),
            transferencia: Number(prevTotal.transferencia) + Number(camionero.transferencia),
            otros: Number(prevTotal.otros) + Number(camionero.otros),
          }));
        });

        return dataJson;
      }
    } catch (error) {
      if (error instanceof Error) {
        notifyError(error?.message);
      } else {
        notifyError("Error al traer los datos del servidor");
      }
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["viajes", date.mes, date.anio],
    queryFn: () => fetchData(),
  });

  if (isError) return <p>{error.message}</p>;

  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="h-[100%] mt-24">
        <h2 className="text-center font-bold text-3xl mb-2">Planilla viajes</h2>
        <DataTable
          columns={columnsPrincipal}
          data={data?.viajesTransformados}
          isLoading={isLoading}
          date={date}
          setDate={setDate}
          isError={isError}
        />
        <div className="mt-12">
          <h2 className="text-center font-bold text-3xl mb-6">
            Datos de cada camionero en el mes: {date.mes}/{date.anio}
          </h2>
          <DataTableSecundaria
            columns={columnsSecundario}
            data={data?.datosSecundarios}
            isLoading={isLoading}
            isError={isError}
            total={total}
          />
        </div>
      </main>
    </div>
  );
};
export default Home;
