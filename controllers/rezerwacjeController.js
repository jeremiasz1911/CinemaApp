const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Guid = require("../app/helpers/guid.js");

module.exports = {

    async findOne(req, res, next) {
        const id = parseInt(req.params.id);
        const sala = await prisma.rezerwacje.findUnique({where:{id}});
        if(!sala) return next();
        return res.status(200).json({ data: sala });
    },

    async findAll(req, res) {
        const rezerwacje = await prisma.rezerwacje.findMany();
        return res.status(200).json({ data: rezerwacje });
    },
      
    async create(req, res) {
        let seansId = parseInt(req.body.seansId);
        const {numberSeats,discount} = req.body;
        const guid = Guid.getUid();
        const rezerwacja = await prisma.rezerwacje.create({
                 data: { numberSeats, seansId, discount, guid }
               });
        return res.status(200).json({ data:rezerwacja });
        },

    async update(req, res, next) {
        const { name } = req.body;
        const id = parseInt(req.params.id);
        const sala = await prisma.rezerwacje.update({
            where: {id},
            data: { name}
        });
        if(!sala) return next();
        return res.status(200).json({ data: sala, message: `Sala was updated` });
    },

    async remove(req, res, next) {
        const id = parseInt(req.params.id);
        const deleteSala = await prisma.rezerwacje.delete({where: {id}});
        if (!deleteSala) return next();
        return res.status(200).json({ message: `Sala was removed` });
    }
};
