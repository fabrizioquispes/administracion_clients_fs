const jwt = require("jsonwebtoken");

 const GenerateToken = (username) => {
 return jwt.sign(username,'ESTA_ES_MI_CLAVE_SECRETA',{
    expiresIn: '1800'
 })   
}

 const AuthenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401); // No se proporcionó el token en el encabezado de autorización
    }

    jwt.verify(token, 'ESTA_ES_MI_CLAVE_SECRETA', (err, user) => {
        if (err) {
            console.error('Error verifying token:', err);
        }

        req.user = user; // Asignar el usuario decodificado al objeto req para su uso posterior
        next(); // Continuar con el siguiente middleware o controlador en la cadena
    });
}

module.exports = {
    GenerateToken,
    AuthenticateToken
}