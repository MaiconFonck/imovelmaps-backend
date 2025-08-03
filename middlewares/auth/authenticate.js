'use strict';

const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido ou mal formatado.' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    req.usuario = usuario; // Armazena o usuário autenticado na requisição
    return next();
  } catch (err) {
    console.error('Erro na autenticação:', err);
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
