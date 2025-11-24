// Importaciones necesarias para el contexto de usuario
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Creación del contexto para la gestión del usuario
const MyContext = createContext()

export const MyProvider = ({ children }) => {
  // Estado para almacenar el token JWT del usuario autenticado
  const [token, setToken] = useState(null);
  
  // Estado para almacenar el email del usuario autenticado
  const [email, setEmail] = useState(null);

  // Variable de entorno para la URL de la API
  const API_URL = import.meta.env.VITE_API_URL;

  // Método para iniciar sesión
  const login = async (email, password) => {
    try {
      // Llamada a la API de login usando la variable de entorno
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      // Verificación de respuesta exitosa
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error en la autenticación')
      }

      // Procesamiento de datos exitosos
      const data = await response.json()
      setToken(data.token)  // Almacena el token JWT
      setEmail(email)       // Almacena el email del usuario
      alert("Inicio de Sesion Exitosa!")
    } catch (error) {
      console.error('Error en login:', error.message)
      alert('Error en login: ' + error.message)
    }
  }
  
  // Método para registrar un nuevo usuario
  const register = async (email, password) => {
    try {
      // Llamada a la API de registro usando la variable de entorno
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // Verificación de respuesta exitosa
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error en el registro')
      }

      // Procesamiento de datos exitosos - login automático tras registro
      const data = await response.json()
      setToken(data.token)  // Almacena el token JWT
      setEmail(email)       // Almacena el email del usuario
      alert("Registro Exitoso!")
    } catch (error) {
      console.error('Error en registro:', error.message)
      alert('Error en registro: ' + error.message)
    }
  }

  // Método para cerrar sesión
  const logout = () => {
    setToken(null)  // Limpia el token
    setEmail(null)  // Limpia el email
  }

  // Método para obtener el perfil del usuario autenticado
  const getProfile = async () => {
    try {
      // Llamada a la API del perfil usando el token de autenticación y la variable de entorno
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}` // Token JWT en el header
        }
      })

      const data = await response.json()
      if (response.ok) {
        return data // Retorna los datos del perfil
      } else {
        throw new Error(data.message || 'Failed to fetch profile')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      alert(error.message)
    }
  }

  // Provider que expone todas las funciones y estados del contexto
  return (
    <MyContext.Provider value={{ 
      token,      // Token JWT actual
      email,      // Email del usuario
      login,      // Función de login
      register,   // Función de registro
      logout,     // Función de logout
      getProfile  // Función para obtener perfil
    }}>
      {children}
    </MyContext.Provider>
  )
}

// Hook personalizado para usar el contexto de usuario
export const useUser = () => useContext(MyContext)

// Validación de PropTypes
MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};