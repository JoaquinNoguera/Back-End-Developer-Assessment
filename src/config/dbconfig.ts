import mongoose from "mongoose";

const urlDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_PATH}`

console.log(urlDB);


export default async function connect() {
    try{
        await mongoose.connect(urlDB);
        console.log('DB connected')
    }catch(err){
        console.log(err);
    }
}
