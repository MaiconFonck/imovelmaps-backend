'use strict';

const bcrypt = require('bcryptjs');
const { Usuario, PermissaoPadrao } = require('../models');

module.exports = {
  /**
   * @swagger
   * /api/usuarios:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Usuários]
   *     responses:
   *       200:
   *         description: Lista de usuários
   */
  async index(req, res) {
    try {
      const usuarios = await Usuario.findAll({ include: ['PermissaoPadraos'] });
      return res.json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro interno ao listar usuários' });
    }
  },

  /**
   * @swagger
   * /api/usuarios/{id}:
   *   get:
   *     summary: Retorna um usuário específico
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *       404:
   *         description: Usuário não encontrado
   */
  async show(req, res) {
    const { id } = req.params;
    try {
      const usuario = await Usuario.findByPk(id, {
        include: ['PermissaoPadraos']
      });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      return res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar usuário' });
    }
  },

  /**
   * @swagger
   * /api/usuarios:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Usuários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nome, email, senha, imobiliaria_id]
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *               imobiliaria_id:
   *                 type: integer
   *     responses:
   *       201:
   *         description: Usuário criado
   */
  async create(req, res) {
    const { nome, email, senha, imobiliaria_id } = req.body;

    if (!nome || !email || !senha || !imobiliaria_id) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const senhaHash = await bcrypt.hash(senha, 10);
      const novo = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        imobiliaria_id
      });

      const { senha: _, ...usuarioSemSenha } = novo.toJSON();
      return res.status(201).json(usuarioSemSenha);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro interno ao criar usuário' });
    }
  },

  /**
   * @swagger
   * /api/usuarios/{id}:
   *   put:
   *     summary: Atualiza um usuário existente
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado
   *       404:
   *         description: Usuário não encontrado
   */
  async update(req, res) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (req.body.senha) {
        req.body.senha = await bcrypt.hash(req.body.senha, 10);
      }

      await usuario.update(req.body);
      return res.json(usuario);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
    }
  },

  /**
   * @swagger
   * /api/usuarios/{id}:
   *   delete:
   *     summary: Remove um usuário
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Usuário removido com sucesso
   *       404:
   *         description: Usuário não encontrado
   */
  async delete(req, res) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await usuario.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      return res.status(500).json({ error: 'Erro interno ao deletar usuário' });
    }
  }
};
