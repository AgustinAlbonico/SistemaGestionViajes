import Navbar from "@/components/Navbar";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { notifyError } from "@/helpers/toastFunction";
import { removeLocalStorage } from "@/utilities/HandleLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface DateStructure {
  mes: number;
  anio: number;
}

const Home: React.FC = () => {
  const [date, setDate] = useState<DateStructure>({
    mes: new Date().getMonth() + 1,
    anio: new Date().getFullYear(),
  });

  const navigate = useNavigate();
  const API_URL = `${import.meta.env.VITE_API_URL}/viaje-admin/aniomes`;

  const token = useMemo(() => {
    const storage = localStorage.getItem("auth");
    if (storage) {
      return JSON.parse(storage).token;
    }
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(`${API_URL}?mes=${date.mes}&anio=${date.anio}`, {
        headers: { Authorization: "Bearer " + token },
      });
      const dataJson = await data.json();

      if (!data.ok) {
        removeLocalStorage();
        navigate("/login", { replace: true });

        throw new Error(dataJson.message);
      } else {
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

  const { data: viajes, isLoading, isError, error } = useQuery({
    queryKey: ["viajes", date.mes, date.anio],
    queryFn: () => fetchData()
  });

  if (isError) return <p>{error.message}</p>;

  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="h-[100%] flex items-center">
        <DataTable
          columns={columns}
          data={viajes}
          isLoading={isLoading}
          date={date}
          setDate={setDate}
          isError={isError}
        />
      </main>
    </div>
  );
};
export default Home;
