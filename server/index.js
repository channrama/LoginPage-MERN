const mongoose= require ("mongoose")
const express=require("express")
const cors=require("cors")
dotenv=require("dotenv")
const UserRouter=require("./Routes/user.js")
const UserLogin=require("./Routes/login.js")
dotenv.config()
server = express()
server.use(express.json())
server.use(cors())
server.use('/auth',UserRouter)
server.use('/auth',UserLogin)

mongoose.connect(`mongodb+srv://dschannappa93:${process.env.mongopass}@login.ofw1iyr.mongodb.net/?retryWrites=true&w=majority&appName=login`)
.then(()=>{
    try {
        console.log("Data base is connected")
    } catch (error) {
        console.log("Errorr whilee connectid DB")
    }
})


server.listen(process.env.PORT, () => {
    try {
        console.log("server started at port 8080")
    } catch (error) {
        console.log("ERROR While connecting the server")
    }
});