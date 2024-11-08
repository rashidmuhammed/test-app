import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Protectedroute from "./utils/Protectedroutes";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Protectedroute />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
