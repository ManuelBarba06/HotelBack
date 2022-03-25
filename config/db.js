const {config} = require('dotenv');
const mongoose = require('mongoose');


const conectarDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://admin:root@cluster0.fjplh.mongodb.net/hotel',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;