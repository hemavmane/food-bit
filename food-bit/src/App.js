import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Component/SignUp";
import Quetions from "./Component/Quetions";
import FoodPage from "./Component/FoodPage";
// import Register from "./Component/Register";
import UserLogin from "./Component/login";
import Home from "./Component/Home";
import AddMeals from "./Component/AddMeals";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FoodPage" element={<FoodPage />} />
        <Route path="/Quetions" element={<Quetions />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/AddMeals" element={<AddMeals />} />
      </Routes>
    </>
  );
}

export default App;
