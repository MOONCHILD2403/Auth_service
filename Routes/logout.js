const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function handleLogout(request, h) {
    try{
        return h.clearCookie('auth-token').response({msg:"cookie cleared"}).code(200);
    }
    catch(err){
        return h.response({error:err}).code(404);          
    }
    
}

module.exports = {
    handleLogout,
}

