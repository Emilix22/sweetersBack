const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const productsController = require('../controllers/productsControllers');

router.get('/', productsController.index);

router.get('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.store);

router.get('/detail/:id/', productsController.detail);

module.exports = router;