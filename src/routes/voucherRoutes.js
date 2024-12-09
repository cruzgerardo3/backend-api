const express = require('express');
const router = express.Router();
const pool = require('../db/index');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


// Crear comprobante de compra
router.post('/purchase', auth(), async (req, res) => {
  const {company_id, voucher_type, voucher_number, date, amount, provider, pdf_url, json_url} = req.body;
  try {
    await pool.query(`INSERT INTO purchase_vouchers 
    (company_id, voucher_type, voucher_number, date, amount, provider, pdf_url, json_url)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [company_id, voucher_type, voucher_number, date, amount, provider, pdf_url, json_url]);
    res.json({msg:'Comprobante de compra creado'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'Error creando comprobante de compra'});
  }
});

// Crear comprobante de venta
router.post('/sale', auth(), async (req, res) => {
  const {company_id, voucher_type, voucher_number, date, amount, client, pdf_url, json_url} = req.body;
  try {
    await pool.query(`INSERT INTO sales_vouchers 
    (company_id, voucher_type, voucher_number, date, amount, client, pdf_url, json_url)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [company_id, voucher_type, voucher_number, date, amount, client, pdf_url, json_url]);
    res.json({msg:'Comprobante de venta creado'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error:'Error creando comprobante de venta'});
  }
});

module.exports = router;
