import { PublicRoutes } from "@/models/routes";
import { getLocalStorageData, removeLocalStorage } from "@/utilities/HandleLocalStorage";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();

  const data = getLocalStorageData();

  const handleLogout = () => {
    const confirm: boolean = window.confirm("Desea cerrar sesión?");
    if (confirm) {
      removeLocalStorage();
      navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    }
  };

  return (
    <header className="w-full h-16 absolute top-0 left-0 bg-[#820486]">
      <nav className="w-[90%] h-full flex justify-between items-center mx-auto">
        <p className="text-2xl text-white font-bold">Bienvenido, {data?.userDb.nombre}!</p>
        <button
          onClick={handleLogout}
          className="bg-white px-4 py-2 rounded-lg text-xl border-[1px] border-[#725ba7] text-[#725ba7] hover:bg-[#725ba7] hover:text-white transition-all duration-300 font-bold"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};
export default Navbar;
