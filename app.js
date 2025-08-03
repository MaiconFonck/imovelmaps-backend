// backend/app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Rotas autenticadas
const publicRoutes = require('./routes/public'); // Rota pública de healthcheck
const setupSwagger = require('./swagger'); // Swagger para documentação da API
const errorHandler = require('./middlewares/api/errorHandler'); // Middleware global de erro

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Documentação da API
setupSwagger(app); // Rota /docs com Swagger

// Rotas da API
app.use('/api', publicRoutes); // GET /api/health
app.use('/api', routes);       // Todas as rotas autenticadas e protegidas

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorHandler);

module.exports = app;
