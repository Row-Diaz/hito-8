// Importaciones necesarias para inicializar React
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Importación de estilos de Bootstrap para toda la aplicación
import "bootstrap/dist/css/bootstrap.min.css";

// Importación del proveedor del contexto de usuario
import { MyProvider } from './context/userContext.jsx';

// Renderizado de la aplicación en el DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Proveedor del contexto de usuario que envuelve toda la aplicación */}
    <MyProvider>
      {/* Componente principal de la aplicación */}
      <App />
    </MyProvider>
  </React.StrictMode>,
)
