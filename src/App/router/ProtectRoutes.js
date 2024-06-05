import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getStorage } from "../helper/storage";
import Header from "../components/Header/Header";

export const ProtectRoutes = ({ children }) => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  const loggedIn = getStorage("logged-in");
  if (loggedIn === null) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <div className="al_dashboard bg_img">
        <div>
          <Header toggle={toggleSidebar} />
          <div className="content m-3 marginTopsss">{children}</div>
        </div>
      </div>
    </>
  );
};
