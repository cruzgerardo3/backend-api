const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const auth = require('../middleware/authMiddleware');

// Reporte de ventas
router.get('/sales', auth(), async (req, res) => {
  const { company_id, from, to } = req.query;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM sales_vouchers 
       WHERE company_id=$1 AND date BETWEEN $2 AND $3
       ORDER BY date`,
      [company_id, from, to]
    );
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({error:'Error generando reporte de ventas'});
  }
});

// Reporte de compras
router.get('/purchases', auth(), async (req, res) => {
  const { company_id, from, to } = req.query;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM purchase_vouchers 
       WHERE company_id=$1 AND date BETWEEN $2 AND $3
       ORDER BY date`,
      [company_id, from, to]
    );
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({error:'Error generando reporte de compras'});
  }
});

module.exports = router;
