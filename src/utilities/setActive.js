export const formatNumber = (total) => {
  return total.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'CLP',
  });
};