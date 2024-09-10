const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env' });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

const prisma = new PrismaClient()

async function handleLogin(request, h) {
    try{
        const email = request.payload.email;
        const password = request.payload.password;
        const user = await prisma.users.findUnique({
            where:{
                email:email,
            },
        })
        const match = await bcrypt.compare(password, user.password);
        if(user && match){
            const token = jwt.sign({userid:user.id,username:user.name,email:user.email},JWT_SECRET,{ expiresIn: '2m' });
            return h.response({"access token":token}).code(200);
        }
        else return h.response({msg:"invalid credentials"}).code(404);
        
    }
    catch(err){
        return h.response({"error":err}).code(404);
    }
    
}

module.exports = {
    handleLogin,
}

