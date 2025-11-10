// Importaciones de React y routing
import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Componentes importados para la estructura de la app
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages importadas - todas las páginas de la aplicación
import Home from "./pages/Home/Home"
import {Cart} from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Pizza from "./pages/Pizza/Pizza";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

// Context importado para el manejo de estado global
import CartProvider from "./context/cartContext";
import { useUser } from "./context/userContext";

function App() {
  // Obtención del token del contexto de usuario para manejar rutas protegidas
  const { token } = useUser;

  return (
    <>
      {/* Proveedor del contexto del carrito que envuelve toda la app */}
      <CartProvider>
        {/* Router principal de la aplicación */}
        <BrowserRouter>
          {/* Navbar siempre visible en todas las páginas */}
          <Navbar />
          
          {/* Definición de todas las rutas de la aplicación */}
          <Routes>
            {/* Ruta principal - Home siempre accesible */}
            <Route path="/" element={<Home />}/>
            
            {/* Ruta de Login - redirige a Home si ya está autenticado */}
            <Route path="/Login" element={token ? <Navigate to="/" /> : <Login />} />
            
            {/* Ruta de Register - siempre accesible */}
            <Route path="/Register" element={<Register />} />         
            
            {/* Ruta del Carrito - accesible para todos */}
            <Route path="/Cart" element={<Cart />}/>
            
            {/* Ruta dinámica para ver detalles de pizza específica */}
            <Route path="/Pizza/:id" element={<Pizza />}/>
            
            {/* Ruta de Profile - redirige a Login si no está autenticado */}
            <Route path="/Profile"  element={token ?  <Navigate to="/Login" /> : <Profile />}/>
            
            {/* Ruta de página no encontrada */}
            <Route path="404" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
        
        {/* Footer siempre visible en todas las páginas */}
        <Footer />
      </CartProvider>   
    </>
  );
}

export default App;