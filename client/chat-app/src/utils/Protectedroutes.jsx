import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";

const Protectedroute = () => {
  const user = false;

  return user ? <Layout /> : <Navigate to="/login" />;
};

export default Protectedroute;
