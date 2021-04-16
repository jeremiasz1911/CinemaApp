const { Router } = require('express');
const { catchAsync } = require("../middlewares/errors.js");
const usersController = require('../controllers/usersController.js');

exports.routes = function() {
    const api = Router();

    // GET /songs/:slug
    api.get('/:id', catchAsync(usersController.findOne));

    // GET /songs
    api.get('/', catchAsync(usersController.findAll));

    api.get('/login/user/', catchAsync(usersController.loginUser));
    // POST /songs
    api.post('/', catchAsync(usersController.create));

    // PUT /songs/:slug
    api.put('/:id', catchAsync(usersController.update));

    // DELETE /songs/:slug
    api.delete('/:id', catchAsync(usersController.remove));

    return api;
};