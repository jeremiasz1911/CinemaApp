const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async findOne(req, res, next) {
        console.log('login');
        const id = parseInt(req.params.id);
        const user = await prisma.users.findUnique({where:{id}});
        if(!user) return next();
        return res.status(200).json({ data: user });
    },

    async findAll(req, res) {
        const allUsers = await prisma.users.findMany();
        return res.status(200).json({ data: allUsers });
    },
      
    async create(req, res) {
        const { login, password, token } = req.body;
        const user = await prisma.users.create({
            data: { login, password, token }
          });
          return res.status(200).json({ data: user });
    },

    async update(req, res, next) {
        console.log('screen');
        const { login, password } = req.body;
        const id = parseInt(req.params.id);
        const user = await prisma.users.update({
            where: {id},
            data: {
              login,
              password,
            }
        });
        if(!user) return next();
        return res.status(200).json({ data: user, message: `User was updated` });
    },

    async remove(req, res, next) {
        const id = parseInt(req.params.id);
        const deleteUser = await prisma.users.delete({where: {id}});
        if (!deleteUser) return next();
        return res.status(200).json({ message: `User was removed` });
    }
};
