const express = require('express');
const router = express.Router();

const publicRoutes = require('./public');

const authController = require('../controllers/auth_controller');
const usuarioController = require('../controllers/usuario_controller');
const imobiliariaController = require('../controllers/imobiliaria_controller');
const imovelController = require('../controllers/imovel_controller');

const authenticate = require('../middlewares/auth/authenticate');
const checkPermission = require('../middlewares/auth/check_permission');

// Rotas públicas
router.use('/', publicRoutes);

// Autenticação
router.post('/login', authController.login);
router.post('/register', authController.register);

// Usuários
router.get('/usuarios', authenticate, usuarioController.index);
router.get('/usuarios/:id', authenticate, usuarioController.show);
router.post('/usuarios', authenticate, usuarioController.create);
router.put('/usuarios/:id', authenticate, usuarioController.update);
router.delete('/usuarios/:id', authenticate, usuarioController.delete);

// Imobiliárias
router.get('/imobiliarias', imobiliariaController.index);
router.get('/imobiliarias/:id', imobiliariaController.show);
router.post('/imobiliarias', imobiliariaController.create);
router.put('/imobiliarias/:id', imobiliariaController.update);
router.delete('/imobiliarias/:id', imobiliariaController.delete);

// Imóveis
router.get('/imoveis', imovelController.index);
router.get('/imoveis/:id', imovelController.show);
router.post('/imoveis', authenticate, checkPermission('gerente'), imovelController.create);
router.put('/imoveis/:id', authenticate, checkPermission('gerente'), imovelController.update);
router.delete('/imoveis/:id', authenticate, checkPermission('gerente'), imovelController.delete);

module.exports = router;
