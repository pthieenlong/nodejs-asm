import express, { NextFunction, Request, Response } from "express";
import Product from "../Model/Product";
import { Utils } from "../Utils/Utils";
export class ProductController {
    constructor() {

    }
    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
        let products = await Product.find();
        return res.status(200).json(products);
    }
    public addProduct = async (req: Request, res: Response, next: NextFunction) => {
        let { name, price, detail: {
            sizes, colors
        }} = req.body;
        if(!name || !price || !sizes || !colors) {
            return res.sendStatus(400).json({
                message: 'required'
            });
        }
        let id = Utils.idConverter(name);
        const duplicated = await Product.findOne({ id });
        if(duplicated) {
            return res.sendStatus(400).json({
                message: "duplicated"
            })
        }
        let product = await Product.create({
            id,
            name,
            price,
            detail: {
                sizes, colors
            },
        })
        if(product) {
            res.status(200).json({
                message: "success"
            })
        } else {
            res.status(409).json({
                message: "failed"
            })
        }
    }
    public getProductByID = async (req:Request, res: Response) => {
        let id = req.params.id;
        if(!id) 
            return ({ message: "required", statusCode: 204 });
        let product = await Product.findOne({ id });
        if(product) {
            return ({
                id: product.id,
                name: product.name,
                price: product.price,
                sale: product.sale,
                desc: product.desc,
                categories: product.categories,
                images: product.images,
                detail: product.detail
            });
        } else ({ message: "failed", statusCode: 409 });
    }
}