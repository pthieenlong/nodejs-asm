import express, { Request, Response } from "express";
import Product from "../Model/Product";
import { Utils } from "../Utils/Utils";
export class ProductController {
    constructor() {

    }
    public getProducts = async (req: Request, res: Response) => {
        let products = await Product.find();
        return res.status(200).json(products);
    }
    public addProduct = async (req: Request, res: Response) => {
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
            images: colors.map((color: string) => {
                return {color, paths: ["a", "b"]};
            }),//[{color}]
        })
        if(product) {
            res.status(200).json({
                message: "success"
            })
        }
    }
}