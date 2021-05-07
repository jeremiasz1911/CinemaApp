const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Time = require("../app/helpers/time.js");

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

    async findTodayFuture(req, res) {
        let today = new Date();
        let nextDay = new Date();
        let filmId = parseInt(req.query.filmId);
        today = Time.add2Hours(today);
        Time.addDays(nextDay,1);
        Time.getStartOfTheDay(nextDay);

        console.log(today,nextDay);
        if(filmId){
            const seanse = await prisma.seanse.findMany({
                orderBy: [
                    {
                      dataSeansu: 'asc',
                    }
                  ],
                where: {   
                    dataSeansu: {
                            gt: today,
                            lt: nextDay
                    },
                    filmId
                }
            });
            return res.status(200).json({ data: seanse });
        }
        const seanse = await prisma.seanse.findMany({
            orderBy: [
                {
                  dataSeansu: 'asc',
                }
              ],
            where: {   
                dataSeansu: {
                        gt: today,
                        lt: nextDay
                }
            }
        });
        return res.status(200).json({ data: seanse });
    },

    async findNextDays(req, res, next) {

        const one = parseInt(req.query.one);
        const two = parseInt(req.query.two);
        const filmId = parseInt(req.query.filmId);

        let firstDay = new Date();
        let secondDay = new Date();
        
        Time.getStartOfTheDay(firstDay);
        Time.getStartOfTheDay(secondDay);
        
        Time.addDays(firstDay,one);
        Time.addDays(secondDay,two);

        console.log(firstDay,secondDay,one,two,);
        if(filmId){
            const seanse = await prisma.seanse.findMany({
                orderBy: [
                    {
                      dataSeansu: 'asc',
                    }
                  ],
                where: {   
                    dataSeansu: {
                            gt: firstDay,
                            lt: secondDay
                    },
                    filmId
                }
            });
            return res.status(200).json({ data: seanse });
        }
        const seanse = await prisma.seanse.findMany({
            orderBy: [
                {
                  dataSeansu: 'asc',
                }
              ],
            where: {   
                dataSeansu: {
                        gt: firstDay,
                        lt: secondDay
                }
            }
        });
        return res.status(200).json({ data: seanse });
    },
      
    async create(req, res) {
        const film = parseInt(req.body.film);
        const sala = parseInt(req.body.sala);
        const price = parseFloat(req.body.price);
        let dataSeansu = (new Date(req.body.data));
        dataSeansu = Time.add2Hours(dataSeansu);
        console.log({
            dataSeansu, film, sala, price
        });
        const seans = await prisma.seanse.create({
            data: {
                price,
                sala:{
                    connect: {
                        id: sala
                     }
                },
                film:{
                    connect: {
                    id: film
                 }
                },
                dataSeansu
            }
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
