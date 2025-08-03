'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imoveis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao: Sequelize.TEXT,
      endereco: Sequelize.STRING,
      preco: Sequelize.DECIMAL,
      quartos: Sequelize.INTEGER,
      banheiros: Sequelize.INTEGER,
      suites: Sequelize.INTEGER,
      vagas_garagem: Sequelize.INTEGER,
      area: Sequelize.FLOAT,
      latitude: Sequelize.FLOAT,
      longitude: Sequelize.FLOAT,
      ativo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      imobiliaria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'imobiliarias', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('imoveis');
  }
};
