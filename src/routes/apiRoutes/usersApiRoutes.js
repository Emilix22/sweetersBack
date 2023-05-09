const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multerUsers');

const usersApiController = require('../../controllers/apiControllers/usersApiControllers');

//Todos los usuarios
router.get('/', usersApiController.list);

//Listar usuarios eliminados
router.get('/removed', usersApiController.removed);
//Recuperar usuario eliminado
router.post('/restore/:id/', usersApiController.restore);

// //buscar usuario
// router.post('/search', usersApiController.search);

//crear usuarios
router.post('/create', upload.single('image'), usersApiController.create);

//editar usuario
router.put('/update/:id/', upload.single('image'), usersApiController.update);

// //Detalle de usuario
// router.get('/detail/:id/', usersApiController.detail);

// //Eliminar usuario
// router.delete('/delete/:id/', usersApiController.destroy);

module.exports = router;