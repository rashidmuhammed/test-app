import { Outlet } from "react-router-dom";
import Header from "../pages/header";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
