const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
// const bcrypt = require('bcriptjs');

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

    removed: (req, res) => {
        Users.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null
                  }
                },
            paranoid: false      
        })
        .then(users => {
            let info = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: '/api/users/removed'
                },
                data: users
            }
            return res.status(200).json(info)
        })
        .catch(error => {console.log(error)})
    },

    restore: (req, res) => {
        Users.restore({
            where: {id: req.params.id}    
        })
        .then(user => {
            let info = {
                meta: {
                    status : 200,
                    url: '/api/users/restore/:id/'
                },
                data: user
            }
            return res.status(200).json(info);
        })
        .catch(error => {console.log(error)})
    },

    create: (req, res) => {
        Users.findOne({
            where: {email: req.body.email}
        })
        .then(userInDB => {
            if(userInDB){
             return res.send('Este email ya está registrado');
            }

            let img;

            if(req.file != undefined){
                img = req.file.filename
            } else {
                img = 'Foto-perfil-generica.png'
            }

            Users.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                image: img,
                level_id: 2
            })
            .then(user => {
                let info = {
                    meta: {
                        status : 200,
                        url: '/api/users/create'
                    },
                    data: user
                }
                return res.status(200).json(info)
            })
        })
        .catch(error => {console.log(error)});

 	}

}

module.exports = controller;