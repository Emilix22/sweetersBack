const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multerUsers');

const usersApiController = require('../../controllers/apiControllers/usersApiControllers');

//Todos los productos
router.get('/', usersApiController.list);

// //Listar productos eliminados
// router.get('/removed', usersApiController.removed);
// //Recuperar producto eliminado
// router.post('/restore/:id/', usersApiController.restore);

// //buscar producto
// router.post('/search', usersApiController.search);

// //crear productos
// router.post('/create', upload.single('image'), usersApiController.create);

// //editar producto
// router.put('/update/:id/', upload.single('image'), usersApiController.update);

// //Detalle de producto
// router.get('/detail/:id/', usersApiController.detail);

// //Eliminar producto
// router.delete('/delete/:id/', usersApiController.destroy);

module.exports = router;