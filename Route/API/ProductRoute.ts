import express, { Request, Response } from 'express';
import { ProductController } from '../../Controller/ProductController';
const router = express.Router();
const productController = new ProductController();

router.route('/')
    .get(productController.getProducts)
    .post(productController.addProduct)

router.route('/:id')
    .get(async (req: Request, res: Response) => {
        let product = await productController.getProductByID(req, res);
        res.render('single-product', { product })
        // console.log(productAPI);
        // res.render('single-product', {product: {
        //     id: productAPI?.id,
        //     name: productAPI?.name,
        //     price: productAPI?.price,
        //     sale: productAPI?.sale,
        //     desc: productAPI?.desc,
        //     categories: productAPI?.categories,
        //     images: productAPI?.images,
        //     detail: productAPI?.detail
        // }});
    });
module.exports = router;
