import { useContext } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import { formatNumber } from "../../utilities/setActive";
import { useUser } from "../../context/userContext";
import "./Navbar.css";

function Navbar() {
    const { total } = useContext(CartContext);
    const { token, logout } = useUser();
    const navigate = useNavigate();
    const setActiveClass = ({ isActive }) => (isActive ?  "active" : "NoActive");
  
    const handleLogout = () => {
      logout();
      navigate("/login");
    }
  
    return (
      <BootstrapNavbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
          <Container>
              <BootstrapNavbar.Brand className="titulo text-white">          
                  Pizzería Mamma Mia!
              </BootstrapNavbar.Brand>
              <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
              <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                      <NavLink to="/" className={setActiveClass}>🍕 Home </NavLink>                        
                      {token ? (
                          <>
                              <NavLink to="/profile" className={setActiveClass}>🔓Profile</NavLink>                
                              <NavLink to="/Logout" className={setActiveClass} onClick={handleLogout}>🔒Logout</NavLink>
                          </>
                      ) : (
                          <>
                              <NavLink to="/Login" className={setActiveClass}>🔐Login</NavLink>
                              <NavLink to="/register" className={setActiveClass}>🔐Register</NavLink>                  
                          </>
                      )}
                  </Nav>
                  {token && (                           
                      <NavLink to="/Cart" className={setActiveClass}>🛒Total: {formatNumber(total)}</NavLink>                                                   
                  )}
              </BootstrapNavbar.Collapse>
          </Container>
      </BootstrapNavbar>
    );
}
export default Navbar;