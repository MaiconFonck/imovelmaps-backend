'use strict';

module.exports = (sequelize, DataTypes) => {
  const Imovel = sequelize.define('Imovel', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: DataTypes.TEXT,
    endereco: DataTypes.STRING,
    preco: DataTypes.DECIMAL,
    quartos: DataTypes.INTEGER,
    banheiros: DataTypes.INTEGER,
    suites: DataTypes.INTEGER,
    vagas_garagem: DataTypes.INTEGER,
    area: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    imobiliaria_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'imoveis'
  });

  Imovel.associate = models => {
    Imovel.belongsTo(models.Imobiliaria, { foreignKey: 'imobiliaria_id' });
  };

  return Imovel;
};
