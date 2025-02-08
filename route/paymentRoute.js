const express = require('express');
const { collect_payment, get_payments, get_account_payments } = require('../controller/paymentController');
const route = express.Router();

route.get('/payments', get_payments);
route.get('/accounts-payment', get_account_payments);

route.post('/collect-payments', collect_payment);

module.exports = route;