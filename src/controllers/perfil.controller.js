const controller = {};

const connection = require('../lib/database');

controller.getPerfil = async function (req, res) {
    if (!req.session.userid) res.redirect('/login');

    // sql perfil
    const sql = 'SELECT username, fullName, phoneNumber FROM users WHERE username = ?';
    const user = await connection.query(sql, [req.session.userid]);
    res.render('perfil', {
        stylesheet: 'css/perfil',
        user: user[0]
    });
};

module.exports = controller;
