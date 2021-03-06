const jwt = require('jsonwebtoken')
const User = require('../models/customers.models')
const authMe = async (req, res, next)=>{
   try{
       const token =  req.header('Authorization').replace('Bearer ','')
       const decodedToken = jwt.verify(token, '123')
       const user = await User.findOne({_id : decodedToken._id, 'tokens.token':token})
       if(!user) throw new Error("you should log first")
        req.user = user
        req.token = token
        //req.max_orders = user.max_orders
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
module.exports = authMe