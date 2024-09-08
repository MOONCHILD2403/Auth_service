const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")

async function handleRegister(request, h) {
    try{
        const name = request.payload.name;
        const email = request.payload.email;
        const password = request.payload.password;
        const hashed_password = await bcrypt.hash(password,10);
        const user = await prisma.users.create({
            data:{
                name:name,
                email:email,
                password:hashed_password,
            },
        })
        return h.response({"user created successfully":user.id}).code(200);
    }
    catch(err){
        return h.response({"error":err}).code(404);
    }
    
}

module.exports = {
    handleRegister,
}

