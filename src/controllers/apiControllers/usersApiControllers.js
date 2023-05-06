const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

//Otra forma de llamar a los modelos
const Users = db.User;
const Levels = db.Level;

const controller = {

    list: (req, res) => {
        Users.findAll({ include: ['level']})
        .then(users => {
            let lastuserIndex = users[users.length - 1]
            let lastUser = users.find(user => user.id == lastuserIndex.id)
            let info = {
                meta: {
                    status : 200,
                    total: users.length,
                    last: lastUser,
                    url: '/api/users'
                },
                data: users
            }
            return res.status(200).json(info)
        })
        .catch(error => {console.log(error)});
    },

}

module.exports = controller;