'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const senhaHash = await bcrypt.hash('123456', 10);

    // Verifica se a imobiliária já existe
    const [imobiliariaExiste] = await queryInterface.sequelize.query(
      `SELECT id FROM imobiliarias WHERE id = 1;`
    );

    if (imobiliariaExiste.length === 0) {
      await queryInterface.bulkInsert('imobiliarias', [{
        id: 1,
        nome: 'Imobiliária Exemplo',
        logo_url: 'https://via.placeholder.com/150',
        ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    }

    // Verifica se o usuário já existe
    const [usuarioExiste] = await queryInterface.sequelize.query(
      `SELECT id FROM usuarios WHERE email = 'admin@exemplo.com';`
    );

    if (usuarioExiste.length === 0) {
      await queryInterface.bulkInsert('usuarios', [{
        id: 1,
        nome: 'Admin da Imobiliária',
        email: 'admin@exemplo.com',
        senha: senhaHash,
        ativo: true,
        imobiliaria_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }]);
    }

    // Permissões padrão
    const permissoes = await queryInterface.sequelize.query(
      'SELECT id FROM permissoes_padrao;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Verifica permissões existentes para o usuário
    const permissoesExistentes = await queryInterface.sequelize.query(
      'SELECT permissao_id FROM usuario_permissoes WHERE usuario_id = 1;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const permissoesExistentesIds = permissoesExistentes.map(p => p.permissao_id);

    const permissoesUsuario = permissoes
      .filter(p => !permissoesExistentesIds.includes(p.id))
      .map(p => ({
        usuario_id: 1,
        permissao_id: p.id,
        created_at: new Date(),
        updated_at: new Date()
      }));

    if (permissoesUsuario.length > 0) {
      await queryInterface.bulkInsert('usuario_permissoes', permissoesUsuario);
    }

    console.log('Usuário admin e permissões aplicadas com sucesso!');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('usuario_permissoes', { usuario_id: 1 });
    await queryInterface.bulkDelete('usuarios', { id: 1 });
    await queryInterface.bulkDelete('imobiliarias', { id: 1 });
  }
};
