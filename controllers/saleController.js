const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async findOne(req, res, next) {
        const id = parseInt(req.params.id);
        const sala = await prisma.sale.findUnique({where:{id}});
        if(!sala) return next();
        return res.status(200).json({ data: sala });
    },

    async findAll(req, res) {
        const sale = await prisma.sale.findMany();
        return res.status(200).json({ data: sale });
    },
      
    async create(req, res) {
        console.log('s');
        return res.status(200).json('s')
        // let name = req.body.name;
        // let rows = parseInt(req.body.rows);
        // let seatsRowsArray = [];
        // let body = Object.keys(req.body);
        // body.map((i)=>{
        //     if(i!=='name'&&i!=='rows'){
        //         seatsRowsArray.push(req.body[i]);
        //     } 
        // });
        // let seatsRows = seatsRowsArray.join();
        // const sala = await prisma.sale.create({
        //          data: { name, rows, seatsRows }
        //        });
        // return res.status(200).json({ data:sala });
        },

    async update(req, res, next) {
        const { name } = req.body;
        const id = parseInt(req.params.id);
        const sala = await prisma.sale.update({
            where: {id},
            data: { name}
        });
        if(!sala) return next();
        return res.status(200).json({ data: sala, message: `Sala was updated` });
    },

    async remove(req, res, next) {
        const id = parseInt(req.params.id);
        const deleteSala = await prisma.sale.delete({where: {id}});
        if (!deleteSala) return next();
        return res.status(200).json({ message: `Sala was removed` });
    }
};
