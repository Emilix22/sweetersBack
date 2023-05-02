const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Otra forma de llamar a los modelos
const Products = db.Product;

const controller = {

    index: (req, res) => {
        Products.findAll()
        .then(products => {
            res.render('index', {products})
        })
        
    },
        
};

module.exports = controller;