const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userLogged = require('./src/middlewares/userLogged');
const cors = require('cors');

const productsApiRoutes = require('./src/routes/apiRoutes/productsApiRoutes');
const colorsApiRoutes = require('./src/routes/apiRoutes/colorsApiRoutes');
const usersApiRoutes = require('./src/routes/apiRoutes/usersApiRoutes');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'Esto es secreto!!',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(userLogged);
app.use(cors());

app.use(express.static("public"));

app.use('/api/products', productsApiRoutes);
app.use('/api/colors', colorsApiRoutes);
app.use('/api/users', usersApiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor corriendo en puerto', port);
});