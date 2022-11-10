import express, { Request, Response } from 'express';
import { ProductController } from '../../Controller/ProductController';
const router = express.Router();
const productController = new ProductController();

router.route('/')
    // .get(productController.getProducts)
    .post(productController.addProduct)
router.route('/:id')
    .get(productController.getProductByID);
module.exports = router;
