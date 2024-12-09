const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware');

// Registrar usuario (solo ADMIN)
router.post('/register', auth('ADMIN'), async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password_hash, email, role) VALUES ($1,$2,$3,$4)', [username, hashed, email, role]);
    res.json({msg:'Usuario creado'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'Error al crear usuario'});
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  if (rows.length === 0) return res.status(401).json({error:'Credenciales inválidas'});
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if(!valid) return res.status(401).json({error:'Credenciales inválidas'});
  
  const token = jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET);
  res.json({token, role:user.role});
});

module.exports = router;
