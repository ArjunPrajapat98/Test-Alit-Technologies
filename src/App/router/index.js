import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Bill from "../components/Pages/Bill/Bill";
import Customer from "../components/Pages/Customer/Customer";

export const routerList = [
  {
    path: "/login",
    element: Login,
    private: 0,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    private: 1,
  },
  {
    path: "/customer",
    element: Customer,
    private: 1,
  },
  {
    path: "/bill",
    element: Bill,
    private: 1,
  },
];

export { ProtectRoutes } from "./ProtectRoutes";
export { PublicRoute } from "./PublicRoute";
