import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Chat1 from "./components/Chat3";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/" element={<Chat1 />}></Route>
    </Routes>
  );
}

export default App;
