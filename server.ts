import express, { Application, Request, Response } from "express";
import { Utils } from "./Utils/Utils";
import cors from "cors";
import cookieParser from "cookie-parser";

const Database = require('./Config/Database');
const app = express();
const PORT = 8080;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views","./View");
app.use(express.static("public"));

// app.use(cors);
// app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.render("index");
});
app.use('/product', require('./Route/ProductRoute'));

app.use('/api/product', require('./Route/API/ProductAPI'));
app.listen(PORT, () => {
    Database();
    console.log(`Server is running at PORT: ${PORT}`);
});