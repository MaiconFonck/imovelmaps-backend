// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error('Erro no servidor:', err);

  const statusCode = err.status || 500;
  const message = err.message || 'Erro interno no servidor';

  res.status(statusCode).json({ error: message });
};
