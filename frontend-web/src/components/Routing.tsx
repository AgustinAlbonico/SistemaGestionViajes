import { PrivateRoutes, PublicRoutes } from "@/models/routes";
import { BrowserRouter, Route } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("@/pages/Login"))
const Home = lazy(() => import("@/pages/Home"))
const AuthGuard = lazy(() => import("@/guards/auth.guard"))
const RoutesWithNotFound = lazy(() => import("@/utilities/RoutesWithNotFound"))

const Routing = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path={PublicRoutes.LOGIN} element={<Login />} />

        <Route element={<AuthGuard />}>
          <Route element={<Home />} path={PrivateRoutes.HOME} index />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};

export default Routing;
