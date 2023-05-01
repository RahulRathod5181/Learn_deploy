const express = require("express");
const {connect} = require("./db")
const jwt = require('jsonwebtoken');
const cors = require("cors")
require("dotenv").config
const {auth} = require("./middleware/auth.middleware")
const {userRoute} = require("./Routes/user.routes")
const {noteRouter} = require("./Routes/notes.routes")
const app=express();
app.use(cors())
app.use(express.json())

app.use("/users",userRoute);

// app.get("/",(req,res)=>{
//     res.status(200).send("Home Page")
// })

// app.get("/about",(req,res)=>{
//     res.status(200).send("About Page")
// })

// app.get("/contact",(req,res)=>{
//     res.status(200).send("Contact Page")
// })

// protected Route
app.use(auth)

app.use("/notes",noteRouter);

// app.get("/movie",(req,res)=>{
//     res.status(200).send("Movie Data")
   
// })

// app.get("/series",(req,res)=>{
//     res.status(200).send("Series Data")
// })




app.listen(process.env.PORT,async()=>{
    try {
        await connect;
        console.log("Connect To DB")
        
    } catch (error) {
        console.log("Cannot caonnect to db")
        console.log(error)
    }
    console.log("server is running at port:",process.env.PORT)
})


