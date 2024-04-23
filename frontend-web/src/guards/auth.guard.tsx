import { PublicRoutes } from "@/models/routes";
import { BackendResponse } from "@/pages/Login";
import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthGuard: FC = () => {
  let userLogged: boolean;

  const auth = localStorage.getItem("auth");

  if (auth) {
    const res: BackendResponse = JSON.parse(auth);
    userLogged = res.isAuth;
  } else {
    userLogged = false;
  }

  return userLogged ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
};

export default AuthGuard;
