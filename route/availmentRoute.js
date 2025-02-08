const express = require('express');
const { avail_cash_advance, get_availments } = require('../controller/availmentController');
const route = express.Router();

route.get('/availments', get_availments);
route.post('/avail-cash-adv', avail_cash_advance);

module.exports = route;