import React from "react";
import {Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import perfil from "./../../assets/img/perfil.jpeg";
import { useUser } from "../../context/userContext";


const Profile = () => {
  const {email, logout} =useUser();
  return (
      <div className="d-flex justify-content-center align-items-center">   
          <div className="d-flex flex-column justify-content-center align-items-center border border-2 border-dark rounded-2 gap-2 mt-2 mb-2 pt-3 pb-3" style={{ width: "350px" }}>                      
          <img src={perfil} alt='Imagen perfil'/>
          <h4>Perfil Usuario:</h4>    
          <Form>                  
          <div className="form-group mr-4 mx-4">
             <strong>{email}</strong>
          </div>
          <div className="m-4">
          <Link to="/" className='boton3 text-white' onClick={logout}>Cerrar Sesion</Link>
          </div>               
          </Form>
          </div>            
      </div>
  );
}
export default Profile;