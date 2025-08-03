'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    imobiliaria_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'usuarios',
    underscored: true // 🔥 isso faz o Sequelize usar created_at e updated_at
  });

  Usuario.associate = models => {
    Usuario.belongsTo(models.Imobiliaria, { foreignKey: 'imobiliaria_id' });
    Usuario.belongsToMany(models.PermissaoPadrao, {
      through: 'usuario_permissoes',
      foreignKey: 'usuario_id'
    });
  };

  return Usuario;
};
