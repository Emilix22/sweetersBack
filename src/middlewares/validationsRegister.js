const { check } = require('express-validator');

const validationsRegister = [

    check('name').notEmpty().withMessage('El campo Nombre es obligatorio'),
    
    check('surname').notEmpty().withMessage('El campo Apellido es obligatorio'),

    check('email').notEmpty().withMessage('El campo Email es obligatorio'),

    check('password').notEmpty().withMessage('El campo Password es obligatorio'),

    check('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.gif', '.jpeg', '.webp'];
        
    
        if (!file.value == null) {
          let fileExtension = path.extname(file.originalname);
          if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
          } 
        }
        return true;
      })
]

module.exports = validationsRegister;