const express = require('express');
const { employee_onboarding_list } = require('../controller/reportsController');
const route = express.Router();

route.get('/employee-onboarding-list/:id', employee_onboarding_list);

module.exports = route;