const express = require('express');
const { get_customers, add_customer, update_customer, delete_customer, get_customer } = require('../controller/customerController');
const route = express.Router();

route.get('/customers',get_customers);
route.get('/customer/:id', get_customer);

route.post('/customer', add_customer);

route.put('/customer/:id', update_customer);

route.patch('/customer/:id', delete_customer);

module.exports = route;