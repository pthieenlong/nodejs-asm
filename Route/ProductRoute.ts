import express, { Request, Response } from 'express';
import { ProductController } from '../Controller/ProductController';
const router = express.Router();
const productController = new ProductController();

router.route('/')
    .get(async (req: Request, res: Response) => {
        let products = await productController.getProductsForPages(req, res);
        res.render('category', { products });
    })

router.route('/:id')
    .get(async (req: Request, res: Response) => {
        let product = await productController.getProductByID(req, res);
        res.render('single-product', { product })
    });
module.exports = router;
