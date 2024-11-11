import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import PropTypes from "prop-types";
import AuthenticationService from "../Services/AuthenticationService";

const ProtectedRoute = ({ children }) => {
  const user = AuthenticationService.getToken();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
