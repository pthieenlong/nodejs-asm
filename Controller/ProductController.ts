import express, { NextFunction, Request, Response } from "express";
import Product from "../Model/Product";
import { Utils } from "../Utils/Utils";
export class ProductController {
    constructor() {

    }
    public getProducts = async (req: Request, res: Response) => {
        let products = await Product.find();
        let productList = products.map((product) => { return {
            id: product.id,
            name: product.name,
            price: Utils.moneyFormat(product.price),
            sale_price: Utils.moneyFormat(product.price*(1 - product.sale)),
            sale: product.sale,
            image: product.images[0],
        }});
        return res.json(productList);
    }
    public getProductsForPages = async (req: Request, res: Response) => {
        let products = await Product.find();
        let productList = products.map((product) => { return {
            id: product.id,
            name: product.name,
            price: Utils.moneyFormat(product.price),
            sale_price: Utils.moneyFormat(product.price*(1 - product.sale)),
            sale: product.sale,
            thumbnail: product.images[0],
        }});
        return productList;
    }
    public addProduct = async (req: Request, res: Response) => {
        let { name, price, detail: { sizes, colors, informations }, categories, desc, images} = req.body;
        if(!name || !price || !sizes || !colors || !informations || !categories) {
            return res.status(400).json({
                message: 'required'
            });
        }
        let id = Utils.idConverter(name);
        const duplicated = await Product.findOne({ id });
        if(duplicated) {
            return res.status(400).json({
                message: "duplicated"
            })
        }
        let product = await Product.create({
            id,
            name,
            price,
            detail: {
                sizes, colors, informations
            },
            categories,
            desc,
            images
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
        console.log(id);
        if(!id) 
            return ({ message: "required", statusCode: 204 });
        let product = await Product.findOne({ id });
        if(product) {
            // console.log()
            return ({
                id: product.id,
                name: product.name,
                price: Utils.moneyFormat(product.price),
                available: product.available,
                sale: product.sale,
                desc: product.desc,
                categories: product.categories,
                images: product.images,
                detail: product.detail
            });
        } else ({ message: "failed", statusCode: 409 });
    }
}