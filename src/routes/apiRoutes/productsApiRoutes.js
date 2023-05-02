const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multer');

const productsApiController = require('../../controllers/apiControllers/productsApiControllers');

//Todos los productos
router.get('/', productsApiController.list);

//Listar productos eliminados
router.get('/removed', productsApiController.removed);
//Recuperar producto eliminado
router.post('/restore/:id/', productsApiController.restore);

//buscar producto
router.post('/search', productsApiController.search);

//crear productos
router.post('/create', upload.single('image'), productsApiController.create);

//editar producto
router.put('/update/:id/', upload.single('image'), productsApiController.update);

//Detalle de producto
router.get('/detail/:id/', productsApiController.detail);

// //Carrito de compras
// router.get('/productCart', productsController.productCart);

//Eliminar producto
router.delete('/delete/:id/', productsApiController.destroy);

module.exports = router;