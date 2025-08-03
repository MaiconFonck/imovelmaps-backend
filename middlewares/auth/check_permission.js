'use strict';

const { UsuarioPermissao, PermissaoPadrao } = require('../../models');

module.exports = (permissaoNome) => {
  return async (req, res, next) => {
    try {
      const usuario_id = req.usuario?.id;

      if (!usuario_id) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
      }

      const permissoes = await UsuarioPermissao.findAll({
        where: { usuario_id },
        include: [{
          model: PermissaoPadrao,
          as: 'Permissao',
          attributes: ['nome']
        }]
      });

      const temPermissao = permissoes.some(p => p.Permissao?.nome === permissaoNome);

      if (!temPermissao) {
        return res.status(403).json({ error: 'Acesso negado: permissão insuficiente.' });
      }

      return next();
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      return res.status(500).json({ error: 'Erro interno ao verificar permissões.' });
    }
  };
};
