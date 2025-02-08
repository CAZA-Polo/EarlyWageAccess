const express = require('express');
const { get_collections } = require('../controller/collectionController');
const route = express.Router();

route.get('/collections', get_collections);

module.exports = route;