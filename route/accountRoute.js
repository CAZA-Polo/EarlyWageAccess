const express = require('express');
const { get_accounts, get_account, add_account, delete_account, update_account } = require('../controller/accountController');
const route = express.Router();

route.get('/accounts', get_accounts);
route.get('/account/:id', get_account);

route.post('/account', add_account);

route.put('/account/:id', update_account);

route.patch('/account/:id', delete_account);

module.exports = route;