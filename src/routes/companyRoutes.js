const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const auth = require('../middleware/authMiddleware');

// Listar empresas
router.get('/', auth(), async (req, res) => {
  const {rows} = await pool.query('SELECT * FROM companies ORDER BY id');
  res.json(rows);
});

// Crear empresa (solo ADMIN)
router.post('/', auth('ADMIN'), async (req, res) => {
  const { name, type, address, phone, email } = req.body;
  try {
    await pool.query('INSERT INTO companies (name, type, address, phone, email) VALUES ($1,$2,$3,$4,$5)',
    [name, type, address, phone, email]);
    res.json({msg:'Empresa creada'});
  } catch(err) {
    console.error(err);
    res.status(500).json({error:'Error al crear empresa'});
  }
});

module.exports = router;
