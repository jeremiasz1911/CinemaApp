const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const path = require('path');
const fs = require('fs');

const Guid = require("../app/helpers/guid.js");

module.exports = {
    async findOne(req, res, next) {
        const id = parseInt(req.params.id);
        const film = await prisma.filmy.findUnique({where:{id}});
        if(!film) return next();
        return res.status(200).json({ data: film });

    },

    async findAll(req, res) {
        const allFilmy = await prisma.filmy.findMany();
        return res.status(200).json({ data: allFilmy });
    },

    async create(req, res) {
        const { title, duration, genre, year, director, description } = req.body;
        const film = await prisma.filmy.create({
            data: {  title, duration, genre, year, director, description}
          });
          return res.status(200).json({ data: film });
    },

    async update(req, res, next) {
        const { login, password } = req.body;
        const id = parseInt(req.params.id);
        const film = await prisma.filmy.update({
            where: {id},
            data: {
              login,
              password,
            }
        });
        if(!film) return next();
        return res.status(200).json({ data: film, message: `film was updated` });
    },

    async remove(req, res, next) {
        const id = parseInt(req.params.id);
        const deleteUser = await prisma.filmy.delete({where: {id}});
        if (!deleteUser) return next();
        return res.status(200).json({ message: `film was removed` });
    },

    async uploadImageFilm(req, res, next) {

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../public/img/filmy/" + Guid.getUid() + '.png');
        const targetGuid = targetPath.substr(targetPath.length - 40);

        let { title, duration, genre, year, director, description} = req.body;

        duration = parseInt(duration);
        year = parseInt(year);
        const film = await prisma.filmy.create({
            data: {  title, duration, genre, year, director, description, picture:targetGuid}
        });
        
        if (path.extname(req.file.originalname).toLowerCase() === ".png") {
            fs.rename(tempPath, targetPath, err => {
            if (err) return next();
                res.status(200).json({});
            });
        } else {
            fs.unlink(tempPath, err => {
            if (err) return next();
            return res
            .status(403)
            .json("Only .png files are allowed!");
        });
        }}
};
