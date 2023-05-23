const { body } = require('express-validator');


const validationsRegister = [

    body('name').notEmpty().withMessage('El campo Nombre es obligatorio'),
    
    body('surname').notEmpty().withMessage('El campo Apellido es obligatorio'),

    body('email').notEmpty().withMessage('El campo Email es obligatorio'),

    body('password').notEmpty().withMessage('El campo Password es obligatorio'),

]

module.exports = validationsRegister;