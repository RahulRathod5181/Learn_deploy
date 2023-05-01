const jwt  = require("jsonwebtoken");


const auth = (req,res,next)=>{
    const token = req.headers.authorization;

    if(token){
        try {
            const decode = jwt.verify(token.split(" ")[1]||token,"life");
            if(decode){
                req.body.authorID = decode.authorID
                req.body.author = decode.author
                // console.log(decode);
                next()
            }else{
                res.send({msg:"Please Login!!"})
            }
            
        } catch (error) {
            res.send({msg:error.message})
        }
    }else{
        res.send({msg:"Please Login!!"})
    }
}


module.exports = {
    auth
}