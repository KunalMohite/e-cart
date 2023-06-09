import "./App.css";
import Login from "./Component/Login";
import UserSignUp from "./Component/UserSignUp";
import LandingPage from "./Component/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSignUp from "./Component/AdminSignUp";
import Product from "./Component/Product";
import Cart from "./Component/Cart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/admin" element={<AdminSignUp />} />
          <Route path="/signup/user" element={<UserSignUp />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
