const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRoutes = require('./src/routes/indexRoutes');
const productsApiRoutes = require('./src/routes/apiRoutes/productsApiRoutes');
const colorsApiRoutes = require('./src/routes/apiRoutes/colorsApiRoutes');
const usersApiRoutes = require('./src/routes/apiRoutes/usersApiRoutes');

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'Esto es secreto!!',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(cors());

app.use(express.static("public"));

app.use('/', indexRoutes);
app.use('/api/products', productsApiRoutes);
app.use('/api/colors', colorsApiRoutes);
app.use('/api/users', usersApiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor corriendo en puerto', port);
});