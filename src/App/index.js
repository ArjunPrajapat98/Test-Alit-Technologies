import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
// import { getStorage, getUserDetails } from "./helper/storage";
import { routerList, PublicRoute, ProtectRoutes } from "./router";
import { utils } from "./helper/utils";
import { getStorage, getUserDetails } from "./helper/storage";

const loggedIn = getStorage('logged-in')
const userDetails = getUserDetails()

  let list = routerList.map((route) => ({
    ...route, element:
        route.private ? <ProtectRoutes><route.element /></ProtectRoutes> :
            <PublicRoute><route.element /></PublicRoute>
}))
export const routers = createBrowserRouter([
    {
        path: "/",
        element: (
            <Navigate to={loggedIn ? '/dashboard' : "/login"} />
        ),
    },
    ...list,
    {
        path: "*",
        element: (
            <Navigate to={loggedIn ? '/dashboard' : "/login"} />
        ),
    },
]);
export default routers;
