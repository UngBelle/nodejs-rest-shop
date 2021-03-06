const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, new Date().toISOString + file.orniginalname)
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, false);
    } else {
    cb(null, true);
    }
};

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', ProductsController.products_update_product);

router.delete('/:productId', ProductsController.products_delete);

module.exports = router;