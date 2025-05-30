import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//Componentes importados
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

//Pages importadas
import Home from "./pages/Home/Home"
import {Cart} from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Pizza from "./pages/Pizza/Pizza";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

//Context importado
import CartProvider from "./context/cartContext";
import { useUser } from "./context/userContext";

function App() {
  const { token } = useUser;

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Login" element={token ? <Navigate to="/" /> : <Login />} />
            <Route path="/Register" element={<Register />} />         
            <Route path="/Cart" element={<Cart />}/>
            <Route path="/Pizza/:id" element={<Pizza />}/>
            <Route path="/Profile"  element={token ?  <Navigate to="/Login" /> : <Profile />}/>
            <Route path="404" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
        <Footer />
      </CartProvider>   
  
    </>
  );
}

export default App;