const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const {handleRegister,handleLogin,handleLogout} = require("./Routes/index");
const base_url = "/api/v1/users";

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: `${base_url}/register`,
        handler: handleRegister,
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(20).required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().min(4).max(10).required(),
                })
            }
        }
    });

    server.route({
        method: 'POST',
        path: `${base_url}/login`,
        handler: handleLogin,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().min(4).max(10).required(),
                })
            }
        }
    });

    server.route({
        method: 'POST',
        path: `${base_url}/logout`,
        handler: handleLogout
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();