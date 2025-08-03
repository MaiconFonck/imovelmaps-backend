// backend/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ImovelMaps API',
      version: '1.0.0',
      description: 'Documentação da API do sistema ImovelMaps',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
