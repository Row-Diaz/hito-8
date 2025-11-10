// Función utilitaria para formatear números como moneda chilena
export const formatNumber = (total) => {
  return total.toLocaleString('es-ES', {
    style: 'currency',    // Formato de moneda
    currency: 'CLP',      // Peso chileno
  });
};