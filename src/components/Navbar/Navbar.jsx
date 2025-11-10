// Importaciones necesarias para la barra de navegación
import { useContext } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { formatNumber } from "../../utilities/setActive";
import { useUser } from "../../context/userContext";
import "./Navbar.css";

function Navbar() {
    // Obtención del total del carrito desde el contexto
    const { total } = useContext(CartContext);
    
    // Obtención de token y función logout del contexto de usuario
    const { token, logout } = useUser();
    
    // Hook para navegación programática
    const navigate = useNavigate();
    
    // Función que determina la clase CSS según si el link está activo
    const setActiveClass = ({ isActive }) => (isActive ?  "active" : "NoActive");
  
    // Función que maneja el logout y redirige al login
    const handleLogout = () => {
      logout();
      navigate("/login");
    }
  
    return (
      <BootstrapNavbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
          <Container>
              {/* Brand/Logo de la aplicación */}
              <BootstrapNavbar.Brand className="titulo text-white">          
                  Pizzería Mamma Mia!
              </BootstrapNavbar.Brand>
              
              {/* Toggle button para dispositivos móviles */}
              <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
              
              <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      {/* Link siempre visible al Home */}
                      <NavLink to="/" className={setActiveClass}>🍕 Home </NavLink>                        
                      
                      {/* Renderizado condicional según estado de autenticación */}
                      {token ? (
                          <>
                              {/* Links para usuario autenticado */}
                              <NavLink to="/profile" className={setActiveClass}>🔓Profile</NavLink>                
                              <NavLink to="/Logout" className={setActiveClass} onClick={handleLogout}>🔒Logout</NavLink>
                          </>
                      ) : (
                          <>
                              {/* Links para usuario no autenticado */}
                              <NavLink to="/Login" className={setActiveClass}>🔐Login</NavLink>
                              <NavLink to="/register" className={setActiveClass}>🔐Register</NavLink>                  
                          </>
                      )}
                  </Nav>
                  
                  {/* Link del carrito solo visible si hay token (usuario autenticado) */}
                  {token && (                           
                      <NavLink to="/Cart" className={setActiveClass}>🛒Total: {formatNumber(total)}</NavLink>                                                   
                  )}
              </BootstrapNavbar.Collapse>
          </Container>
      </BootstrapNavbar>
    );
}
export default Navbar;