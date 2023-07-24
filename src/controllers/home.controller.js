const controller = {};
const connection = require('../lib/database');

controller.processContact = function (contact) {
    // Fecha de nacimiento
    if (contact.birthday) {
        contact.birthday = contact.birthday.toLocaleString('es-ES').substring(0, contact.birthday.toLocaleString('es-ES').indexOf(','));
    }

    // Days ago

    if (Math.trunc((new Date() - contact.date_at) / 1000 / 60 / 60 / 24) === 0) contact.date_at = 'today';
    else {
        contact.date_at = `${Math.trunc((new Date() - contact.date_at) / 1000 / 60 / 60 / 24)} days ago`;
    }

    return contact;
};

controller.getHome = function (req, res) {
    const session = req.session;

    if (session.userid) {
        // query
        const sql = 'SELECT * FROM contacts WHERE username = ? ORDER BY date_at DESC';
        connection.query(sql, [session.userid])
            .then(result => {
                result = result.map((contact) => {
                    return controller.processContact(contact);
                });
                res.render('home', {
                    stylesheet: 'css/home',
                    contact: result
                });
            });
    } else {
        res.redirect('/login');
    }
};

controller.postAppend = async function (req, res) {
    const session = req.session;

    // Realizamos el insert
    const sql = 'INSERT INTO contacts (username, firstName, lastName, phoneNumber, address, birthday) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.query(sql, [
        session.userid,
        req.body.firstname,
        req.body.lastname,
        (req.body.phoneNumber === '') ? null : req.body.phoneNumber,
        (req.body.address === '') ? null : req.body.address,
        (req.body.birthday === '') ? null : req.body.birthday
    ]);

    res.redirect('/home');
};

controller.postRemove = async function (req, res) {
    // Realizamos el delete
    const sql = 'DELETE FROM contacts WHERE id = ?';
    await connection.query(sql, [Number(req.params.id)]);
    res.redirect('/home');
};

module.exports = controller;
