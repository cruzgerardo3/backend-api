router.post('/purchase_with_files', auth(), upload.fields([
    { name: 'pdf_file', maxCount: 1 },
    { name: 'json_file', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const { company_id, voucher_type, voucher_number, date, amount, provider } = req.body;
      const pdfFile = req.files['pdf_file'] ? req.files['pdf_file'][0] : null;
      const jsonFile = req.files['json_file'] ? req.files['json_file'][0] : null;
  
      if (!pdfFile || !jsonFile) {
        return res.status(400).json({ error: 'Se requieren ambos archivos PDF y JSON.' });
      }
  
      const pdf_url = pdfFile.path;
      const json_url = jsonFile.path;
  
      await pool.query(
        `INSERT INTO purchase_vouchers (company_id, voucher_type, voucher_number, date, amount, provider, pdf_url, json_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
         [company_id, voucher_type, voucher_number, date, amount, provider, pdf_url, json_url]
      );
  
      res.json({ msg: 'Comprobante de compra creado con archivos' });
    } catch (err) {
      console.error(err);
      res.status(500).json({error:'Error creando comprobante de compra con archivos'});
    }
  });
  