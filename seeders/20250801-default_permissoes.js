'use strict';

module.exports = {
  async up(queryInterface) {
    const permissoes = [
      { nome: 'ver_imoveis', descricao: 'Permite visualizar imóveis' },
      { nome: 'editar_imoveis', descricao: 'Permite editar imóveis' },
      { nome: 'ver_crm', descricao: 'Permite visualizar o CRM' },
      { nome: 'editar_crm', descricao: 'Permite editar o CRM' },
      { nome: 'participar_roleta', descricao: 'Permite participar da roleta de imóveis' },
      { nome: 'ver_relatorios_financeiros', descricao: 'Permite visualizar relatórios financeiros' }
    ];

    const permissoesComData = permissoes.map(p => ({
      ...p,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('permissoes_padrao', permissoesComData, {
      ignoreDuplicates: true // Ignora duplicações
    });

    console.log('Permissões padrão inseridas com sucesso!');
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('permissoes_padrao', null, {});
  }
};
