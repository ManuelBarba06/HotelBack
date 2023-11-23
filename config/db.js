import mongoose from "mongoose";


const connectDb = async () => {
    try{
        await mongoose.connect('mongodb+srv://admin:root@cluster0.fjplh.mongodb.net/hotel',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database")
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;