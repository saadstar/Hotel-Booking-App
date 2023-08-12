import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Hotels } from "./Components/Hotels";
import { Hotel } from "./Components/Hotel";
import { Login } from "./Components/Login";
import { Sign } from "./Components/Sign";
import { Booking } from "./Components/Booking";
import { NavBar } from "./Components/NavBar";

function App() {
  return (
    <div className="">
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/hotels" element={<Hotels />}></Route>
        <Route path="/hotels/:id" element={<Hotel />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Sign />}></Route>
      </Routes>
    </div>
  );
}

export default App;
