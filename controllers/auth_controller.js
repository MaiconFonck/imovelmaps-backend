const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  /**
   * @swagger
   * /api/login:
   *   post:
   *     summary: Realiza o login do usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - senha
   *             properties:
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *       401:
   *         description: Senha incorreta
   *       404:
   *         description: Usuário não encontrado
   */
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const user = await Usuario.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }

      const senhaCorreta = await bcrypt.compare(senha, user.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({ token });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ erro: 'Erro ao fazer login' });
    }
  },

  /**
   * @swagger
   * /api/register:
   *   post:
   *     summary: Registra um novo usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - senha
   *               - imobiliaria_id
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
   *         description: Usuário criado com sucesso
   *       400:
   *         description: E-mail já cadastrado ou campos ausentes
   *       500:
   *         description: Erro ao registrar
   */
  register: async (req, res) => {
    const { nome, email, senha, imobiliaria_id } = req.body;

    if (!nome || !email || !senha || !imobiliaria_id) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
      const existeUsuario = await Usuario.findOne({ where: { email } });
      if (existeUsuario) {
        return res.status(400).json({ erro: 'E-mail já cadastrado' });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada,
        imobiliaria_id
      });

      const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();

      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      console.error('Erro detalhado no registro:', error);
      res.status(500).json({ erro: 'Erro ao registrar usuário' });
    }
  }
};
