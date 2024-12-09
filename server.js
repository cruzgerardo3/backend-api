require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes');
const companyRoutes = require('./src/routes/companyRoutes');
const voucherRoutes = require('./src/routes/voucherRoutes');
const reportRoutes = require('./src/routes/reportRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/vouchers', voucherRoutes);
app.use('/reports', reportRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Backend escuchando en puerto', PORT));
