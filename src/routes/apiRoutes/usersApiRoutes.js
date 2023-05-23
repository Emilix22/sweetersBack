const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multerUsers');
const validationsLogin = require('../../middlewares/validationsLogin');
const validationsRegister = require('../../middlewares/validationsRegister')
const validationImage = require ('../../middlewares/validationImage')

const usersApiController = require('../../controllers/apiControllers/usersApiControllers');

//Todos los usuarios
router.get('/', usersApiController.list);

//login de usuario
router.post('/login', [validationsLogin], usersApiController.login);

//Listar usuarios eliminados
router.get('/removed', usersApiController.removed);
//Recuperar usuario eliminado
router.post('/restore/:id/', usersApiController.restore);

//crear usuario
router.post('/create',  upload.single('image'), validationImage, [validationsRegister], usersApiController.create);

//editar usuario
router.put('/update/:id/', upload.single('image'), usersApiController.update);

//Perfil de usuario
router.get('/profile/:id', usersApiController.profile);

//Modificar permisos de usuario
// router.get('/level/:id/', adminMiddleware, usersController.level);
router.put('/level/:id/', usersApiController.changeLevel);

//Eliminar usuario
// router.get('/delete/:id/', usersController.confirmDelete)
router.delete('/delete/:id/', usersApiController.destroy);

//Cerrar sesión
router.get('/logout', usersApiController.logout);

module.exports = router;