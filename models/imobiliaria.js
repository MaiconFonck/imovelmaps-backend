'use strict';

module.exports = (sequelize, DataTypes) => {
  const Imobiliaria = sequelize.define('Imobiliaria', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    logo_url: DataTypes.STRING,
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'imobiliarias'
  });

  Imobiliaria.associate = models => {
    Imobiliaria.hasMany(models.Usuario, { foreignKey: 'imobiliaria_id' });
    Imobiliaria.hasMany(models.Imovel, { foreignKey: 'imobiliaria_id' });
  };

  return Imobiliaria;
};
