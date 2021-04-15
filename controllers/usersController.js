const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Song = 'song'

module.exports = {
    async findOne(req, res, next) {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) return next();
        return res.status(200).send({ data: song });
    },

    async findAll(req, res) {
        const allUsers = await prisma.users.findMany();
        return res.status(200).json({ data: allUsers });
    },
      
    async create(req, res) {
        console.log('rip');
        const { login, password, token } = req.body;
        
        const user = await prisma.users.create({
            data: { login, password, token }
          });

          return res.status(200).json({ data: user });
    },

    async update(req, res, next) {
        const song = await Song.find({ 'slug': req.params.slug });
        if (!song) return next();

        song.title = req.body.title;
        await song.save();

        return res.status(200).send({ data: song, message: `Song was updated` });
    },

    async remove(req, res, next) {
        const song = await Song.findOne({ 'slug': req.params.slug });
        if (!song) return next();
        await song.remove();

        return res.status(200).send({ message: `Song was removed` });
    }
};
