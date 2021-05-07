const { Router } = require('express');
const { catchAsync } = require("../middlewares/errors.js");

const usersController = require('../controllers/usersController.js');
const filmyController = require('../controllers/filmyController.js');
const saleController = require('../controllers/saleController.js');
const seanseController = require('../controllers/seanseController.js');
const rezerwacjeController = require('../controllers/rezerwacjeController.js');

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

    //SEANSE
    api.get('/seanse/:id', catchAsync(seanseController.findOne));
    api.get('/seanse/', catchAsync(seanseController.findAll));
    api.get('/seanseTodayFuture/', catchAsync(seanseController.findTodayFuture));
    api.get('/seanseNextDays/', catchAsync(seanseController.findNextDays));
    api.post('/seanse/', upload.single("file"), catchAsync(seanseController.create));
    api.put('/seanse/:id', catchAsync(seanseController.update));
    api.delete('/seanse/:id',catchAsync(seanseController.remove));

    //SEANSE
    api.get('/rezerwacje/:id', catchAsync(rezerwacjeController.findOne));
    api.get('/rezerwacje/', catchAsync(rezerwacjeController.findAll));
    api.post('/rezerwacje/', upload.single("file"), catchAsync(rezerwacjeController.create));
    api.put('/rezerwacje/:id', catchAsync(rezerwacjeController.update));
    api.delete('/rezerwacje/:id',catchAsync(rezerwacjeController.remove));
    return api;
};