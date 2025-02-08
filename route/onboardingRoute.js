const express = require('express');
const { onboard_employees, onboard_employer } = require('../controller/onboardingController');
const route = express.Router();

route.post('/onboard-employees', onboard_employees);
route.post('/onboard-employer', onboard_employer);

module.exports = route;