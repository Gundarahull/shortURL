require('dotenv').config()

const express = require('express')

const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

const PORT = process.env.PORT
connectDB()

app.use(cors())

app.use(express.json()) //miidleware to parse the request json

app.use(express.urlencoded({ extended: true })) //miidleware to parse the  request form

//To see the logs
app.use((req, res,next) => {
    console.log(" Request URL : ", req.url)
    console.log(" Request Method : ", req.method)
    next()
})


app.use("/url", require("./routes/url.route"))

app.use('/test',(req,res)=>{
    return res.status(200).json({
        success:true,
        messagae:"Health check"
    })
})

app.listen(PORT, () => {
    console.log(`Server is Listening at ${PORT}`);
})