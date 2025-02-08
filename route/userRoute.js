const express = require('express');
const { get_users, user_signup, user_login, get_user, user_update, user_delete } = require('../controller/UserController');
const route = express.Router();

// GET
route.get('/users',get_users);
route.get('/user/:id', get_user);

// POST
route.post('/user-login', user_login);
route.post('/user',user_signup);

// PUT
route.put('/user/:id', user_update);

// PATCH
route.patch('/user/:id', user_delete);

module.exports = route;