'use strict';

module.exports = (sequelize, DataTypes) => {
  const UsuarioPermissao = sequelize.define('UsuarioPermissao', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    permissao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'usuario_permissoes'
  });

  UsuarioPermissao.associate = (models) => {
    UsuarioPermissao.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    });

    UsuarioPermissao.belongsTo(models.PermissaoPadrao, {
      foreignKey: 'permissao_id',
      as: 'permissao'
    });
  };

  return UsuarioPermissao;
};
