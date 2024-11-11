import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Protectedroute from "./utils/Protectedroutes";
import Home from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CreateActivities from "./pages/CreateActivities";
function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<Protectedroute />}>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="create" element={<CreateActivities />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
