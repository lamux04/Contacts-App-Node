// Modulos importados
const { encriptPassword, comparePassword } = require('../lib/bcrypt');
const connection = require('../lib/database');

const controller = {};

// LOGIN
controller.getLogin = function (req, res) {
    const session = req.session;

    // Si existe el userid en la cookie, es decir, esta la sesion iniciada
    if (session.userid) res.redirect('/home');
    else {
        res.render('login', {
            stylesheet: 'css/login',
            warning: false
        });
    }
};

controller.postLogin = function (req, res) {
    const session = req.session;

    // Comprobamos si existe el usuario
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [
        req.body.username
    ])
        .then(result => {
            if (result.length === 0) { // Usuario incorrecto
                res.render('login', {
                    stylesheet: 'css/login',
                    warning: true
                });
            } else { // Comprobamos contrasena
                comparePassword(req.body.password, result[0].password)
                    .then(result => {
                        if (result) { // Contrasena correcta
                            session.userid = req.body.username;
                            res.redirect('/home');
                        } else { // Contrasena incorrecta
                            res.render('login', {
                                stylesheet: 'css/login',
                                warning: true
                            });
                        }
                    });
            }
        });
};

// REGISTRO
controller.getSignup = function (req, res) {
    const session = req.session;

    if (session.userid) res.redirect('/home');
    else {
        res.render('signup', {
            stylesheet: 'css/signup',
            warning: false
        });
    }
};

controller.postSignup = function (req, res) {
    const session = req.session;

    // Comprobamos si el nombre de usuario existe en la base de datos
    const sql = 'SELECT username FROM users WHERE username = ?';
    connection.query(sql, [req.body.username])
        .then((result) => {
            if (result.length === 0) { // El usuario no existe
            // Almacenamos el nuevo usuario en la base de datos
                const sql = 'INSERT INTO users VALUES (?, ?, ?, ?)';
                encriptPassword(req.body.password)
                    .then((pass) => {
                        connection.query(sql, [
                            req.body.username,
                            pass,
                            (req.body.fullname === '') ? null : req.body.fullname,
                            (req.body.phoneNumber === '') ? null : req.body.phoneNumber
                        ])
                            .then(result => {
                                // Una vez almacenado
                                session.userid = req.body.username;
                                res.redirect('/home');
                            });
                    });
            } else { // El usuario ya existe
                res.render('signup', {
                    stylesheet: 'css/signup',
                    warning: true
                });
            }
        });
};

module.exports = controller;
