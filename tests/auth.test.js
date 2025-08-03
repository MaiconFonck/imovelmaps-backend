// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const { Usuario, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

describe('Autenticação - /api/login', () => {
  let imobiliariaId;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Cria uma imobiliária para referência de chave estrangeira
    const imobiliaria = await sequelize.models.Imobiliaria.create({
      nome: 'Imobiliária Teste',
      email: 'contato@teste.com',
      telefone: '11999999999',
      logo_url: 'https://teste.com/logo.png'
    });

    imobiliariaId = imobiliaria.id;

    const senhaHash = await bcrypt.hash('senha123', 10);
    await Usuario.create({
      nome: 'Usuário Teste',
      email: 'teste@example.com',
      senha: senhaHash,
      imobiliaria_id: imobiliariaId
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve autenticar com credenciais válidas e retornar token', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'teste@example.com', senha: 'senha123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('deve falhar com senha incorreta', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'teste@example.com', senha: 'senhaErrada' });

    expect(res.statusCode).toBe(401);
    expect(res.body.mensagem).toBe('Senha incorreta');
  });

  it('deve falhar com e-mail inexistente', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'inexistente@example.com', senha: 'senha123' });

    expect(res.statusCode).toBe(404);
    expect(res.body.mensagem).toBe('Usuário não encontrado');
  });
});
