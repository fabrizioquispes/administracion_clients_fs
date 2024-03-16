const {pool} = require('../utils/dbconfig.js');
const sql = require('mssql');
const {GenerateToken} = require('../utils/GenerateToken.js');

async function loginUsers(req, res) {
    try {
        const { email, password } = req.body;
        const request = pool.request();

        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);

        const result = await request.execute('SP_LOGIN_USERS');
        if(result.recordset.length > 0){
            const username = result.recordset[0];
            const token = GenerateToken(username);
            res.json({
                data: username,
                token: token
            });
        }else{
            res.status(401).json({ error: 'Credenciales inválidas' });
        }

    } catch (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUsers(req,res){
    try {
        const result = await pool.query('SELECT * FROM Users');
        res.json({
            data: result.recordset
        })
    } catch (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function insertUsers(req,res){
    try {
        const { username,email, password,cover,birthday,dni } = req.body;
        const request = pool.request();

        request.input('username',sql.VarChar,username)
        request.input('email',sql.VarChar,email)
        request.input('password',sql.VarChar,password)
        request.input('cover',sql.VarChar,cover)
        request.input('birthday',sql.VarChar,birthday)
        request.input('dni',sql.VarChar,dni)

        await request.execute('SP_REGISTER_USERS');
        res.json({
            message: 'Se creo con éxito',
            status: 201
        })

    } catch (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateUsers(req, res) {
    try {
        const { id_user } = req.params;
        const { username, email, password, cover, birthday, dni } = req.body;
        const request = pool.request();

        request.input('id_user', sql.Int, id_user);
        request.input('username', sql.VarChar, username);
        request.input('email', sql.VarChar, email);
        request.input('password', sql.VarChar, password);
        request.input('cover', sql.VarChar, cover);
        request.input('birthday', sql.VarChar, birthday);
        request.input('dni', sql.VarChar, dni);

        await request.execute('SP_UPDATE_USERS');

        res.json({
            message: 'Se actualizó con éxito',
            status: 201
        });

    } catch (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function deleteUsers(req, res) {
    try {
        const { id_user,id_course,id_master } = req.body;
        const request = pool.request();

        request.input('id_user', sql.Int, id_user);
        request.input('id_course', sql.Int, id_course);
        request.input('id_master', sql.Int, id_master);


        await request.execute('SP_DELETE_USERS');

        res.json({
            message: 'Usuario eliminado exitosamente',
            status: 200
        });
    } catch (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).json({ message: 'Primero daremos de baja al alumno intentelo denuevo' });
    }
}


module.exports = {
    deleteUsers,
    updateUsers,
    insertUsers,
    loginUsers,
    getUsers
}