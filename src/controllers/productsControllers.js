const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Otra forma de llamar a los modelos
const Products = db.Product;
const Colors = db.Color;

const controller = {

    index: (req, res) => {
        Products.findAll()
        .then(products => {

            res.render('./products/productsList', {products})
        })
    },
    
    create: (req, res) => {
        Colors.findAll()
            .then(colors => {
                res.render('./products/productCreate', {colors})
            })
 	},

     store: (req, res) => {
		let img

		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = 'logo.jpg'
		}

		Products.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            image: img,
            sale: req.body.sale,
            color_id: req.body.color
        })
        .then(product => {
            res.redirect('/products')
        });

 	},

     detail: (req, res) => {

		Products.findByPk(req.params.id, {include: [{association: 'color'}]})
            .then(product => {
                res.render('products/productDetail', {product});
            });
	},
    
};

module.exports = controller;