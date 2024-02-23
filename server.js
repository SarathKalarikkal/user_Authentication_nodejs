const express = require('express')
const errorHandler = require('./middleWare/errorHandler')
const app = express()
const dotenv = require('dotenv').config()
const connectDB = require('./config/dbConnection')


const PORT = 5001

connectDB()


app.use(express.json())

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))


app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`The server is start on port : ${PORT}`)
})
