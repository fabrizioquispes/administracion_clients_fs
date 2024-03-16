const express = require("express");
const path = require("path");
const {loginUsers, getUsers, insertUsers, updateUsers, deleteUsers} = require("../controller/users.controller.js");
const { AuthenticateToken } = require("../utils/GenerateToken.js");
const user_router = express.Router();

//Documentación de las APIS
user_router.get('/', () => {
    res.sendFile(__dirname + '/public/index.html')
})

//Registro y Login
user_router.post('/login',loginUsers);
user_router.post('/register',insertUsers);

//Usuarios Authenticados
user_router.get('/users',AuthenticateToken,getUsers);
user_router.put('/update/:id',AuthenticateToken,updateUsers);
user_router.delete('/delete/:id',AuthenticateToken,deleteUsers)

module.exports = {
    user_router
}