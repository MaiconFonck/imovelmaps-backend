'use strict';

const { Imobiliaria } = require('../models');

module.exports = {
  /**
   * @swagger
   * /api/imobiliarias:
   *   get:
   *     summary: Lista todas as imobiliárias
   *     tags: [Imobiliárias]
   *     responses:
   *       200:
   *         description: Lista de imobiliárias
   */
  async index(req, res) {
    try {
      const imobiliarias = await Imobiliaria.findAll();
      return res.json(imobiliarias);
    } catch (error) {
      console.error('Erro ao listar imobiliárias:', error);
      return res.status(500).json({ error: 'Erro interno ao listar' });
    }
  },

  /**
   * @swagger
   * /api/imobiliarias/{id}:
   *   get:
   *     summary: Retorna uma imobiliária específica
   *     tags: [Imobiliárias]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Imobiliária encontrada
   *       404:
   *         description: Imobiliária não encontrada
   */
  async show(req, res) {
    const { id } = req.params;
    try {
      const imobiliaria = await Imobiliaria.findByPk(id);
      if (!imobiliaria) {
        return res.status(404).json({ error: 'Imobiliária não encontrada.' });
      }
      return res.json(imobiliaria);
    } catch (error) {
      console.error('Erro ao buscar imobiliária:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar' });
    }
  },

  /**
   * @swagger
   * /api/imobiliarias:
   *   post:
   *     summary: Cria uma nova imobiliária
   *     tags: [Imobiliárias]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *             properties:
   *               nome:
   *                 type: string
   *               logo_url:
   *                 type: string
   *     responses:
   *       201:
   *         description: Imobiliária criada
   */
  async create(req, res) {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O nome é obrigatório' });
    }

    try {
      const nova = await Imobiliaria.create(req.body);
      return res.status(201).json(nova);
    } catch (error) {
      console.error('Erro ao criar imobiliária:', error);
      return res.status(500).json({ error: 'Erro interno ao criar' });
    }
  },

  /**
   * @swagger
   * /api/imobiliarias/{id}:
   *   put:
   *     summary: Atualiza uma imobiliária existente
   *     tags: [Imobiliárias]
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
   *               logo_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Imobiliária atualizada
   *       404:
   *         description: Imobiliária não encontrada
   */
  async update(req, res) {
    const { id } = req.params;

    try {
      const imobiliaria = await Imobiliaria.findByPk(id);
      if (!imobiliaria) {
        return res.status(404).json({ error: 'Imobiliária não encontrada.' });
      }
      await imobiliaria.update(req.body);
      return res.json(imobiliaria);
    } catch (error) {
      console.error('Erro ao atualizar imobiliária:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar' });
    }
  },

  /**
   * @swagger
   * /api/imobiliarias/{id}:
   *   delete:
   *     summary: Remove uma imobiliária
   *     tags: [Imobiliárias]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Imobiliária removida
   *       404:
   *         description: Imobiliária não encontrada
   */
  async delete(req, res) {
    const { id } = req.params;

    try {
      const imobiliaria = await Imobiliaria.findByPk(id);
      if (!imobiliaria) {
        return res.status(404).json({ error: 'Imobiliária não encontrada.' });
      }
      await imobiliaria.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar imobiliária:', error);
      return res.status(500).json({ error: 'Erro interno ao deletar' });
    }
  }
};
