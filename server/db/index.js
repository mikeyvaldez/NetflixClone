const { PrismaClient } = require("@prisma/client")  // allows us to create a new instance of prisma

const prisma = new PrismaClient()   // new isntance


module.exports = {
    prisma,
};