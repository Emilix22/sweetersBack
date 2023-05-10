const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multerUsers');

const usersApiController = require('../../controllers/apiControllers/usersApiControllers');

//Todos los usuarios
router.get('/', usersApiController.list);

//login de usuario
router.post('/login', usersApiController.login);

//Listar usuarios eliminados
router.get('/removed', usersApiController.removed);
//Recuperar usuario eliminado
router.post('/restore/:id/', usersApiController.restore);

//crear usuario
router.post('/create', upload.single('image'), usersApiController.create);

//editar usuario
router.put('/update/:id/', upload.single('image'), usersApiController.update);

// //Perfil de usuario
// router.get('/profile/:id', usersApiController.profile);

// //Modificar permisos de usuario
// router.get('/level/:id/', adminMiddleware, usersController.level);
// router.put('/level/:id/', usersController.processLevel);

// //Eliminar usuario
// router.get('/delete/:id/', usersController.confirmDelete)
// router.delete('/delete/:id/', adminMiddleware, usersController.destroy);

// //Cerrar sesión
// router.get('/logout', usersController.logout);

module.exports = router;