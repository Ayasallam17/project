const jwt = require('jsonwebtoken')
const Worker = require("../models/worker.model")
const authWorker = async (req, res, next)=>{
   try{
       const token =  req.header('Authorization').replace('Bearer ','')
       const decodedToken = jwt.verify(token, '123')
       const user = await Worker.findOne({_id : decodedToken._id, 'tokens.token':token})
       if(!user) throw new Error("you should log first")
        req.user = user
        req.token = token
        next()
   }
   catch(e){
    res.status(400).send({
        apistatus:false,
        data: e.message,
        message: 'you are not auther'
    })
   }
    
}
module.exports = authWorker