const controller = {};

const connection = require('../lib/database');
const { encriptPassword } = require('../lib/bcrypt');

// GET Todos los usuario
controller.getUserApi = async function (req, res) {
    const sql = 'SELECT username, fullName, phoneNumber FROM users';
    const result = await connection.query(sql);
    res.json(result);
};

// GET Un unico usuario
controller.getOneUserApi = async function (req, res) {
    const sql = 'SELECT username, fullName, phoneNumber FROM users WHERE username = ?';
    const result = await connection.query(sql, [req.params.username]);
    res.json(result);
};

// POST Crear un usuario
controller.postUserApi = async function (req, res) {
    // Comprobamos si ya existe
    let sql = 'SELECT username FROM users WHERE username = ?';
    const result = await connection.query(sql, [req.body.username]);
    if (result.length > 0) return res.status(404).json({ error: 'El nombre de usuario ya existe' });
    if (!req.boyd.fullName) return res.status(404).json({ error: 'Algunos campos son obligatorios' });
    if (req.body.phoneNumber.length > 9) return res.status(404).json({ error: 'El telefono es demasiado largo' });

    // Agregamos el usuario
    sql = 'INSERT INTO users VALUES (?, ?, ?, ?)';
    const pass = await encriptPassword(req.body.password);
    await connection.query(sql, [
        req.body.username,
        pass,
        req.body.fullName,
        req.body.phoneNumber
    ]);

    res.json({
        username: req.body.username,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber
    });
};

// PUT Editar un usuario
controller.putUserApi = async function (req, res) {
    // Comprobamos si ya existe
    let sql = 'SELECT username FROM users WHERE username = ?';
    const result = await connection.query(sql, [req.params.username]);
    if (result.length === 0) return res.status(404).json({ error: 'El nombre de usuario no existe' });
    if (!req.boyd.fullName) return res.status(404).json({ error: 'Algunos campos son obligatorios' });
    if (req.body.phoneNumber.length > 9) return res.status(404).json({ error: 'El telefono es demasiado largo' });

    // Editar el usuario
    sql = 'UPDATE users SET fullName = ?, phoneNumber = ? WHERE username = ?';
    await connection.query(sql, [
        req.body.fullName,
        req.body.phoneNumber,
        req.params.username
    ]);
    res.json({
        username: req.params.username,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber
    });
};

controller.getContactsApi = async function (req, res) {
    const sql = 'SELECT * FROM contacts';
    const result = await connection.query(sql);
    res.json(result);
};

controller.getContactIdApi = async function (req, res) {
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    const result = await connection.query(sql, [Number(req.params.id)]);
    if (result.length === 0) return res.status(404).json({ error: 'El id no existe' });
    res.json(result);
};

controller.getContactUsernameApi = async function (req, res) {
    // Comprobamos si existe el usuario
    let sql = 'SELECT username FROM users WHERE username = ?';
    let result = await connection.query(sql, [req.params.username]);
    if (result.length === 0) return res.status(404).json({ error: 'El nombre de usuario no existe' });

    sql = 'SELECT * FROM contacts WHERE username = ?';
    result = await connection.query(sql, [req.params.username]);
    res.json(result);
};

controller.postContactApi = async function (req, res) {
    if (req.body.username === undefined || req.body.firstName === undefined || req.body.lastName === undefined) return res.status(404).json({ error: 'Algunos campos son obligatorios' });
    if (req.body.username !== undefined && req.body.phoneNumber.length > 9) return res.status(404).json({ error: 'El telefono es demasiado largo' });
    // Comprobamos si existe el usuario
    let sql = 'SELECT username FROM users WHERE username = ?';
    const result = await connection.query(sql, [req.body.username]);
    if (result.length === 0) return res.status(404).json({ error: 'El nombre de usuario no existe' });

    sql = 'INSERT INTO contacts (username, firstName, lastName, phoneNumber, address, birthday) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.query(sql, [
        req.body.username,
        req.body.firstName,
        req.body.lastName,
        req.body.phoneNumber,
        req.body.address,
        req.body.birthday
    ]);

    res.json({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        birthday: req.body.birthday
    });
};

module.exports = controller;
