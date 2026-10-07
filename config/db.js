require('dotenv').config()

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("MongoDB Sucessfully connected ");
        

    } catch (error) {
        console.log("Error while connecting to the MongoDB : ", error);


    }

}


module.exports= connectDB



