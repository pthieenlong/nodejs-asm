import mongoose, { Schema } from "mongoose";
interface IProduct {
    id: string,
    name: string,
    price: number,
    sale: number,
    desc: string,
    available: boolean,
    categories: [
        {
            id: string,
            title: string,
        }
    ],
    images: [
        {
            color: string,
            paths: string[],
        }
    ],
    detail: {
        sizes: number[],
        colors: string[],
        informations: string[]
    },
}
const productSchema = new Schema<IProduct>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        default: 0
    },
    desc: {
        type: String,
        default: "Lorem ipsum",
    },
    available: {
        type: Boolean,
        default: true,
    },
    categories: [{
        id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        }
    }],
    detail: {
        sizes: [{
            type: Number,
            required: true,
        }],
        colors: [
            {
                type: String,
                required: true,
            }
        ],
        informations: [
            {
                type: String,
                required: true,
            }
        ],
    },
    images: [{
        type: String,
        default: "duong dan hinh anh",
    }],
}, { timestamps: true })

export default mongoose.model("Product", productSchema);