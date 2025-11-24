import './login.css';
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUser } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { token, login } = useUser()

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage('Error en inicio de sesión');
      console.error(error);
    } finally {
      setLoading(false);
      setEmail("")
      setPassword("")
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center border border-2 border-dark rounded-2 gap-2 mt-2 mb-2 pt-3 pb-3" style={{ width: "350px" }}>
        <h3>Inicio de Sesion</h3>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Form onSubmit={handleSubmit}>
          <div className="form-label mr-4 mx-4">
            <label>Email:</label>
            <input type="email" className="form-control" placeholder="Ingrese Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group mr-4 mx-4">
            <label>Contraseña:</label>
            <input type="password" className="form-control" placeholder="Ingrese Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="btn btn-dark mt-3" disabled={loading}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</Button>
        </Form>
      </div>
    </div>
  );
};
export default Login; 