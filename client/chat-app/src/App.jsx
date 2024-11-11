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
        <Route path="/" element={<Protectedroute />}>
          <Route path="home" element={<Home />} />
          <Route path="create" element={<CreateActivities />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
