const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async findOne(req, res, next) {
        const id = parseInt(req.params.id);
        const seans = await prisma.seanse.findUnique({where:{id}});
        if(!seans) return next();
        return res.status(200).json({ data: seans });
    },

    async findAll(req, res) {
        const seanse = await prisma.seanse.findMany();
        return res.status(200).json({ data: seanse });
    },
      
    async create(req, res) {
        const {filmId,salaId,date,price} = req.body
        const seans = await prisma.seanse.create({
                 data: {filmId,salaId,date,price}
               });
        return res.status(200).json({ data:seans });
        },

    async update(req, res, next) {
        const { name } = req.body;
        const id = parseInt(req.params.id);
        const seans = await prisma.seanse.update({
            where: {id},
            data: { name}
        });
        if(!seans) return next();
        return res.status(200).json({ data: seans, message: `seans was updated` });
    },

    async remove(req, res, next) {
        const id = parseInt(req.params.id);
        const deleteSala = await prisma.seanse.delete({where: {id}});
        if (!deleteSala) return next();
        return res.status(200).json({ message: `seans was removed` });
    }
};
