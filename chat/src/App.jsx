import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
