import express from 'express';
import { ProductController } from '../../Controller/ProductController';
const router = express.Router();
const productController = new ProductController();

router.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct)
module.exports = router;
