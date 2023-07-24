// Dependencias
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('node:path');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();

// Modulos importados
const { freePort } = require('./lib/free-port');

// html and css (handlebars)
app.engine('handlebars', engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// static public
app.use(express.static(path.join(__dirname, 'public')));

// session manager
app.use(sessions({
    secret: 'secretCode',
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    resave: false
}));

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/login.routes'));

// PROBANDO
app.get('/home', (req, res) => {
    res.render('home', {
        stylesheet: 'css/home',
        contact: [
            {
                id: 1,
                firstName: 'Javier',
                lastName: 'Labrador Munoz',
                phoneNumber: '672663446',
                address: 'c/ Fuerteventura 27, Jerez, Cadiz, 11406',
                birthday: '2004-06-25',
                date_at: 'today'
            },
            {
                id: 2,
                firstName: 'Javier',
                lastName: 'Labrador Munoz',
                phoneNumber: '672663446',
                address: null,
                birthday: '2004-06-25',
                date_at: '3 days ago'
            },
            {
                id: 3,
                firstName: 'Javier',
                lastName: 'Labrador Munoz',
                phoneNumber: '672663446',
                address: 'c/ Fuerteventura 27, Jerez, Cadiz, 11406',
                birthday: null,
                date_at: '5 days ago'
            },
            {
                id: 4,
                firstName: 'Javier',
                lastName: 'Labrador Munoz',
                phoneNumber: null,
                address: 'c/ Fuerteventura 27, Jerez, Cadiz, 11406',
                birthday: '2004-06-25',
                date_at: '7 days ago'
            },
            {
                id: 5,
                firstName: 'Javier',
                lastName: 'Labrador Munoz',
                phoneNumber: null,
                address: null,
                birthday: null,
                date_at: '8 days ago'
            }
        ]
    });
});
// FIN PROBANDO

// Iniciar servidor
freePort(3000)
    .then(port => {
        app.listen(port, () => console.log(`Connection realized on http://localhost:${port}`));
    });
