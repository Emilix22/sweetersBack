const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Otra forma de llamar a los modelos
const Products = db.Product;
const Colors = db.Color;

const controller = {

    list: (req, res) => {
        Products.findAll({ include: ['color']})
        .then(products => {
            let info = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: '/api/products'
                },
                data: products
            }

            return res.status(200).json(info)
        })
        .catch(error => {console.log(error)});
    },

    removed: (req, res) => {
        Products.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null
                  }
                },
            paranoid: false      
        })
        .then(products => {
            let info = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: '/api/products/removed'
                },
                data: products
            }
            return res.status(200).json(info)
        })
        .catch(error => {console.log(error)})
    },

    restore: (req, res) => {
        Products.restore({
            where: {id: req.params.id}    
        })
        .then(product => {
            let info = {
                meta: {
                    status : 200,
                    url: '/api/products/restore/:id/'
                },
                data: product
            }
            return res.status(200).json(info);
        })
        .catch(error => {console.log(error)})
    },
    
    create: (req, res) => {
        console.log(req._parsedOriginalUrl.Url)
		let img;

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
            let info = {
                meta: {
                    status : 200,
                    url: '/api/products/create'
                },
                data: product
            }
            return res.status(200).json(info)
        })
        .catch(error => {console.log(error)});

 	},

    update: (req,res) => {
        let productToEdit  = Products.findByPk(req.params.id);
        let img;

		if(req.file != undefined){
			img = req.file.filename
		} else {
			img = productToEdit.image
		}

        Products.update({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            image: img,
            sale: req.body.sale,
            color_id: req.body.color
        },
        {
            where: {id: req.params.id}
        })
        .then(product => {
            let info = {
                meta: {
                    status : 200,
                    url: '/api/products/update/:id/'
                },
                data: product
            }
            return res.status(200).json(info)
        })
        .catch(error => res.send(error))
    },

    search: (req, res) => {
        
        if(req.body.search) {
            Products.findAll({
                where: {
                    name: {[Op.like]: '%'+req.body.search+'%'}    
                }
        })
        .then(products => {
           
            if(products.length > 0){
                let info = {
                    meta: {
                        status : 200,
                        total: products.length,
                        url: '/api/products'
                    },
                    data: products
                }

                return res.status(200).json(info)
                
            }else{
                res.send('Lo siento, no hemos encontrado su consulta..')
            }
            })
        }else{
            res.send('debe indicar el producto que quiere buscar..')
        }
        
        
        },

    detail: (req, res) => {

		Products.findOne({
            where: {id: req.params.id},
            include: ['color']
        })
        .then(product => {
            let info = {
                meta: {
                    status : 200,
                    url: '/api/products/detail/:id/'
                },
                data: product
            }
            return res.status(200).json(info)
        })
        .catch(error => res.send(error))
	},

    destroy: (req, res) => {
        Products.destroy({
            where: {id: req.params.id}
        })
        .then(product => {
            let info = {
                meta: {
                    status : 200,
                    url: '/api/products/delete/:id/'
                },
                data: product
            }
            return res.status(200).json(info)
        })         
    }
    
};

module.exports = controller;