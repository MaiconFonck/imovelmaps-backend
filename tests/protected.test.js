// tests/protected.test.js
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { Usuario, Imobiliaria, PermissaoPadrao, UsuarioPermissao, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

describe('Rotas protegidas - /api/imoveis', () => {
  let tokenComPermissao;
  let tokenSemPermissao;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const imobiliaria = await Imobiliaria.create({ nome: 'ImoTest', email: 'imo@test.com' });

    const senhaHash = await bcrypt.hash('senha123', 10);

    const usuarioAutorizado = await Usuario.create({
      nome: 'Autorizado',
      email: 'autorizado@example.com',
      senha: senhaHash,
      imobiliaria_id: imobiliaria.id,
    });

    const usuarioNaoAutorizado = await Usuario.create({
      nome: 'NaoAutorizado',
      email: 'naoautorizado@example.com',
      senha: senhaHash,
      imobiliaria_id: imobiliaria.id,
    });

    const permissao = await PermissaoPadrao.create({
      nome: 'acessar-imoveis',
      descricao: 'Pode acessar os imóveis',
    });

    await UsuarioPermissao.create({
      usuario_id: usuarioAutorizado.id,
      permissao_id: permissao.id,
    });

    tokenComPermissao = jwt.sign({ id: usuarioAutorizado.id }, process.env.JWT_SECRET);
    tokenSemPermissao = jwt.sign({ id: usuarioNaoAutorizado.id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve negar acesso sem token', async () => {
    const res = await request(app).get('/api/imoveis');
    expect(res.statusCode).toBe(401);
  });

  it('deve negar acesso com token sem permissão', async () => {
    const res = await request(app)
      .get('/api/imoveis')
      .set('Authorization', `Bearer ${tokenSemPermissao}`);
    expect(res.statusCode).toBe(403);
  });

  it('deve permitir acesso com token e permissão', async () => {
    const res = await request(app)
      .get('/api/imoveis')
      .set('Authorization', `Bearer ${tokenComPermissao}`);
    expect(res.statusCode).toBe(200);
  });
});
