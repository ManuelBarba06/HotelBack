import mongoose from "mongoose";

const connectDb = async () => {
    try {
        
        const urlDatabase = process.env.NODE_ENV.trim() === "dev"
        ?process.env.URL_DEV_DB_NAME
        :process.env.URL_PROD_DB_NAME
        
        await mongoose.connect(`${urlDatabase}/${process.DB_NAME}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        
        console.log("Database connected")
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;