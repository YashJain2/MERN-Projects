const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inote";

const connectDB = async () => {
    mongoose.connect(mongoURI,()=>{
        console.log("Database is connected successfully");
    });
}

module.exports = connectDB;


