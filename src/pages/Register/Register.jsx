import React, { useState } from "react";
import { Button, Form} from "react-bootstrap";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { token, register } = useUser(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword]= useState ("");
    const [loading, setLoading] = useState(false);

    const navigate =useNavigate()

    if (token) {
        navigate("/")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
          
        if (!email || !password || !confPassword  ) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (password !== confPassword){
            alert ("El password y la confirmación del password deben ser iguales")
            setPassword(""); 
            setConfPassword("");
            return
        }

        setLoading(true);

        try {
                await register(email, password, confPassword);
                 
              } catch (error) {
                alert('Error al registrarse. Intenta nuevamente.');
                console.error(error); 
              
              } finally {
                setLoading(false);                 
              } 
        
        setEmail("");      
        setPassword(""); 
        setConfPassword("");
    }
          
    
    return (
        <div className="d-flex justify-content-center align-items-center">   
            <div className="d-flex flex-column justify-content-center align-items-center border border-2 border-dark rounded-2 gap-2 mt-2 mb-2 pt-3 pb-3" style={{ width: "350px" }}>                      
            <h3>Formulario de Registro</h3>    
            <Form onSubmit={handleSubmit}>                 
            <div className="form-label mr-4 mx-4">
                <label>Email:</label>
                <input type="email" className="form-control" placeholder="Ingrese Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group mr-4 mx-4">
                <label>Contraseña:</label>
                <input type="password" className="form-control" placeholder="Ingrese Password" value={password} onChange={(e) => setPassword(e.target.value)}required/>
            </div>
            <div className="form-group mr-4 mx-4">          
                <label>Confirmar Password</label>
                <input type="password" className="form-control" placeholder="Confirme password" value={confPassword} onChange={(e) => setConfPassword (e.target.value)} required/>
            </div>
                <Button  type="submit" className="btn btn-dark mt-3"  disabled={loading}>{loading ? 'Cargando...' : 'Registrarme'}</Button>                   
            </Form>
            </div>            
        </div>
    );

};
export default Register;