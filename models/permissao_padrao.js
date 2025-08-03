'use strict';

module.exports = (sequelize, DataTypes) => {
  const PermissaoPadrao = sequelize.define('PermissaoPadrao', {
    nome: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    descricao: DataTypes.STRING
  }, {
    tableName: 'permissoes_padrao'
  });

  PermissaoPadrao.associate = models => {
    PermissaoPadrao.belongsToMany(models.Usuario, {
      through: 'usuario_permissoes',
      foreignKey: 'permissao_id'
    });
  };

  return PermissaoPadrao;
};
