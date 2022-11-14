import express, { Application, Request, Response } from "express";
import { Utils } from "./Utils/Utils";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ProductController } from "./Controller/ProductController";

const Database = require('./Config/Database');
const app = express();
const PORT = 8080;

const productController = new ProductController();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views","./View");
app.use(express.static("public"));

app.use(cors({
    origin: "http://127.0.0.1:5501",
    optionsSuccessStatus: 200
}));
// app.use(cookieParser());

app.get('/', async (req: Request, res: Response) => {
    let products = await productController.getProductsForPages(req, res);
    res.render("index", { products });
});
app.use('/product', require('./Route/ProductRoute'));

app.use('/api/product', require('./Route/API/ProductAPI'));
app.listen(PORT, () => {
    Database();
    console.log(`Server is running at PORT: ${PORT}`);
});