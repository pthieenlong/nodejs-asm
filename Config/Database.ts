import mongoose from "mongoose";
require('dotenv').config();
const DATABASE_URI = "mongodb://127.0.0.1:27017/NodeJS-asm";
const ConnectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI as string, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
        });
    }
    catch(error: any) {
        console.log(error);
    }
}

module.exports = ConnectDatabase;