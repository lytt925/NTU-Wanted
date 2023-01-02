import mongoose from "mongoose";
import dotenv from 'dotenv-defaults'
import { dataInit } from "./dataInit";
dotenv.config();

export default {
    connect: () => {
        mongoose
            .connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(async res => {
                if (process.env.MODE === 'Reset') {
                    console.log('Reset Mode: reset the data')
                    dataInit()
                } else {
                    console.log("mongo db connection created")
                }
            })

        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
    }
}