

const express = require("express");
const bcrypt = require('bcrypt');
const {UserModel} = require("../Model/User.model")
const jwt = require('jsonwebtoken');
const userRoute = express.Router();

userRoute.post("/register",async(req,res)=>{
    //logic
    const {email,pass,name,age} = req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash) =>{
            // Store hash in your password DB.
            const user = new UserModel({email,name,age,pass:hash})
            await user.save()
            res.status(200).send({msg:"New User has been Registered"})

        });
        
    } catch (error) {
        res.status(400).send({msg:error.message})
    }

})

userRoute.post("/login",async(req,res)=>{
    //logic 
    const {email,pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, function(err, result) {
                // result == true
                if(result){
                    const token = jwt.sign({ authorID:user._id, author:user.name}, 'life');  // {expiresIn:60*10} for session time
                    res.status(200).send({msg:"Login Succesfull",token:token})
                }else{
                    res.status(200).send({msg:"Wrong Credientials"})
                }
            });
            
        }else{
            res.status(200).send({msg:"Wrong Credientials"})
        }
        
    } catch (err) {
        res.status(400).send({msg:err.message})
    }
})

module.exports = {
    userRoute
}