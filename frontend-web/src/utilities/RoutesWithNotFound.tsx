import {LupaSvg} from "@/assets/svg/SvgIcons";
import { PrivateRoutes } from "@/models/routes";
import { FC } from "react";
import { Routes, Route, Link } from "react-router-dom";

interface RoutesWithNotFoundProps {
  children: JSX.Element[] | JSX.Element;
}

const RoutesWithNotFound: FC<RoutesWithNotFoundProps> = ({ children }) => {
  return (
    <Routes>
      {children}
      <Route
        path="*"
        element={
          <div className="flex flex-col items-center">
            <LupaSvg />
            <h2 className="font-bold text-4xl mt-10 mb-10">Página no encontrada!</h2>
            <Link to={PrivateRoutes.HOME}>
              <button className="bg-white px-8 py-2 rounded-lg border-[1px] border-[#725ba7] text-[#725ba7] hover:bg-[#725ba7] hover:text-white transition-all duration-300 font-bold">
                Ir al inicio
              </button>
            </Link>
          </div>
        }
      />
    </Routes>
  );
};
export default RoutesWithNotFound;
