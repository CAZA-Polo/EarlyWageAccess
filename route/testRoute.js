const express = require('express');
const { delete_accounts } = require('../controller/testController');
const route = express.Router();

route.delete('/delete-accounts', delete_accounts);

module.exports = route;