// tests/imoveis_crud.test.js
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { Usuario, Imobiliaria, Imovel, PermissaoPadrao, UsuarioPermissao, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

describe('CRUD Imóveis - Rotas protegidas com permissão', () => {
  let token;
  let idImovel;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const imobiliaria = await Imobiliaria.create({ nome: 'Imobiliária CRUD' });

    const usuario = await Usuario.create({
      nome: 'Usuário CRUD',
      email: 'crud@example.com',
      senha: await bcrypt.hash('senha123', 10),
      imobiliaria_id: imobiliaria.id,
    });

    const permissoes = ['acessar-imoveis', 'criar-imoveis', 'editar-imoveis', 'excluir-imoveis'];
    for (const nome of permissoes) {
      const permissao = await PermissaoPadrao.create({ nome, descricao: `Permissão para ${nome}` });
      await UsuarioPermissao.create({ usuario_id: usuario.id, permissao_id: permissao.id });
    }

    token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('deve criar um imóvel com sucesso', async () => {
    const res = await request(app)
      .post('/api/imoveis')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Casa de Teste',
        descricao: 'Casa ampla e confortável',
        endereco: 'Rua dos Testes, 123',
        preco: 500000,
        quartos: 3,
        banheiros: 2,
        suites: 1,
        vagas_garagem: 2,
        area: 120.5,
        latitude: -23.55052,
        longitude: -46.633308,
        imobiliaria_id: 1,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Casa de Teste');
    idImovel = res.body.id;
  });

  it('deve atualizar um imóvel existente', async () => {
    const res = await request(app)
      .put(`/api/imoveis/${idImovel}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ preco: 550000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.preco).toBe('550000');
  });

  it('deve excluir um imóvel existente', async () => {
    const res = await request(app)
      .delete(`/api/imoveis/${idImovel}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
