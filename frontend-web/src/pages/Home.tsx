import Navbar from "@/components/Navbar";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { notifyError } from "@/helpers/toastFunction";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface DateStructure {
  mes: number;
  anio: number;
}

const Home: React.FC = () => {
  const [date, setDate] = useState<DateStructure>({
    mes: new Date().getMonth() + 1,
    anio: new Date().getFullYear(),
  });

  const API_URL = "http://localhost:3000/api/viaje/asd";

  const fetchData = () => {
    return fetch(`${API_URL}?mes=${date.mes}&anio=${date.anio}`).then((res) =>
      res.json()
    );
  };

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["viajes", date.mes, date.anio],
    queryFn: fetchData,
  });

  useEffect(() => {
    fetchData();
  }, [date, refetch]);

  useEffect(() => {
    //checkeo mediante el token si la sesion no expiro
    const checkAuth = async () => {};
    checkAuth();
  }, []);

  if (isError) return <p>{error.message}</p>;

  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="h-[100%] flex items-center">
        <DataTable
          columns={columns}
          data={data}
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
