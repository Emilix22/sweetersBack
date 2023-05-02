const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Otra forma de llamar a los modelos
const Products = db.Product;
const Colors = db.Color;

const controller = {

    list: (req, res) => {
        Colors.findAll()
        .then(colors => {
            let info = {
                meta: {
                    status : 200,
                    total: colors.length,
                    url: '/api/colors'
                },
                data: colors
            }

            return res.status(200).json(info)
        })
        .catch(error => {console.log(error)});
    }

};

module.exports = controller;