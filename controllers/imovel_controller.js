'use strict';

const { Imovel } = require('../models');

module.exports = {
  /**
   * @swagger
   * /api/imoveis:
   *   get:
   *     summary: Lista todos os imóveis
   *     tags: [Imóveis]
   *     responses:
   *       200:
   *         description: Lista de imóveis
   */
  async index(req, res) {
    try {
      const imoveis = await Imovel.findAll();
      return res.json(imoveis);
    } catch (error) {
      console.error('Erro ao listar imóveis:', error);
      return res.status(500).json({ error: 'Erro interno ao listar imóveis' });
    }
  },

  /**
   * @swagger
   * /api/imoveis/{id}:
   *   get:
   *     summary: Retorna um imóvel específico
   *     tags: [Imóveis]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Imóvel encontrado
   *       404:
   *         description: Imóvel não encontrado
   */
  async show(req, res) {
    const { id } = req.params;
    try {
      const imovel = await Imovel.findByPk(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado.' });
      }
      return res.json(imovel);
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar imóvel' });
    }
  },

  /**
   * @swagger
   * /api/imoveis:
   *   post:
   *     summary: Cadastra um novo imóvel
   *     tags: [Imóveis]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [titulo, descricao, preco]
   *             properties:
   *               titulo:
   *                 type: string
   *               descricao:
   *                 type: string
   *               preco:
   *                 type: number
   *     responses:
   *       201:
   *         description: Imóvel criado com sucesso
   */
  async create(req, res) {
    try {
      const { titulo, descricao, preco } = req.body;

      if (!titulo || !descricao || !preco) {
        return res.status(400).json({ error: 'Campos obrigatórios: titulo, descricao e preco' });
      }

      const novo = await Imovel.create(req.body);
      return res.status(201).json(novo);
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
      return res.status(500).json({ error: 'Erro interno ao criar imóvel' });
    }
  },

  /**
   * @swagger
   * /api/imoveis/{id}:
   *   put:
   *     summary: Atualiza um imóvel
   *     tags: [Imóveis]
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
   *     responses:
   *       200:
   *         description: Imóvel atualizado com sucesso
   *       404:
   *         description: Imóvel não encontrado
   */
  async update(req, res) {
    const { id } = req.params;
    try {
      const imovel = await Imovel.findByPk(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado.' });
      }

      await imovel.update(req.body);
      return res.json(imovel);
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar imóvel' });
    }
  },

  /**
   * @swagger
   * /api/imoveis/{id}:
   *   delete:
   *     summary: Remove um imóvel
   *     tags: [Imóveis]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Imóvel removido com sucesso
   *       404:
   *         description: Imóvel não encontrado
   */
  async delete(req, res) {
    const { id } = req.params;
    try {
      const imovel = await Imovel.findByPk(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado.' });
      }

      await imovel.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
      return res.status(500).json({ error: 'Erro interno ao deletar imóvel' });
    }
  }
};
