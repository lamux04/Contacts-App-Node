const bcrypt = require('bcryptjs');

// Encriptar contrasena
async function encriptPassword (password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(password, salt, (err, hash) => { // Encriptamos la contrasena y resolvemos la promesa
                if (err) reject(err);
                else resolve(hash);
            });
        });
    });
}

// Comparar contrasena encriptada
async function comparePassword (password, encriptedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encriptedPassword, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}

module.exports = {
    encriptPassword,
    comparePassword
};
