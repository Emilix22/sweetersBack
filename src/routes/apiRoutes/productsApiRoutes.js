const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multerProducts');

const productsApiController = require('../../controllers/apiControllers/productsApiControllers');

//Todos los productos -- Ecommerce y Sistema
router.get('/', productsApiController.list);

//Listar productos eliminados -- Sistema solo admin
router.get('/removed', productsApiController.removed);
//Recuperar producto eliminado -- Sistema solo admin
router.post('/restore/:id/', productsApiController.restore);

//buscar producto Ecommerce y Sistema
router.post('/search', productsApiController.search);

//crear productos Sistema solo admiin
router.post('/create', upload.single('image'), productsApiController.create);

//editar producto Sistema solo admin
router.put('/update/:id/', upload.single('image'), productsApiController.update);

//Detalle de producto Ecommerce y Sistema
router.get('/detail/:id/', productsApiController.detail);

// //Carrito de compras
// router.get('/productCart', productsController.productCart);

//Eliminar producto Sistema solo admin
router.delete('/delete/:id/', productsApiController.destroy);

module.exports = router;