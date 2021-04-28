const { Router } = require('express');
const { catchAsync } = require("../middlewares/errors.js");
const usersController = require('../controllers/usersController.js');
const filmyController = require('../controllers/filmyController.js');
const saleController = require('../controllers/saleController.js');
const multer = require('multer');
const upload = multer({dest: "./public/"});

exports.routes = function() {
    const api = Router();

    //USER
    api.get('/users/:id', catchAsync(usersController.findOne));
    api.get('/users/', catchAsync(usersController.findAll));
    api.post('/users/', catchAsync(usersController.create));
    api.put('/users/:id', catchAsync(usersController.update));
    api.delete('/users/:id', catchAsync(usersController.remove));

    //FILM
    api.get('/filmy/:id', catchAsync(filmyController.findOne));
    api.get('/filmy/', catchAsync(filmyController.findAll));
    api.post('/filmy/', catchAsync(filmyController.create));
    api.put('/filmy/:id', catchAsync(filmyController.update));
    api.delete('/filmy/:id', catchAsync(filmyController.remove));
    api.post('/filmy/upload/', upload.single("file"),catchAsync(filmyController.uploadImageFilm));

    //SALE
    api.get('/sale/:id', catchAsync(saleController.findOne));
    api.get('/sale/', catchAsync(saleController.findAll));
    api.post('/sale/', upload.single("file"), catchAsync(saleController.create));
    api.put('/sale/:id', catchAsync(saleController.update));
    api.delete('/sale/:id',catchAsync(saleController.remove));
    return api;
};