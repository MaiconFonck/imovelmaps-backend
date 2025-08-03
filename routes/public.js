const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verifica se a API está online
 *     responses:
 *       200:
 *         description: API online
 */
router.get('/health', (req, res) => {
  res.status(200).json({ ok: true, status: 'online', timestamp: new Date() });
});

module.exports = router;
