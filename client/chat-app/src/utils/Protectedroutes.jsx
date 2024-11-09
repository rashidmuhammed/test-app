import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import AuthenticationService from "../Services/AuthenticationService";

const Protectedroute = () => {
  const user = AuthenticationService.getToken();

  return user ? <Layout /> : <Navigate to="/login" />;
};

export default Protectedroute;
