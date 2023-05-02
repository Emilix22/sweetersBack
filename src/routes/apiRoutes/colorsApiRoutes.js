const express = require('express');
const router = express.Router();

const colorsApiController = require('../../controllers/apiControllers/colorsApiControllers');

//Todos los productos
router.get('/', colorsApiController.list);


module.exports = router;