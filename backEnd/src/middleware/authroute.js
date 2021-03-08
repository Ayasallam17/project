const Worker = require('../models/worker.model')
const jwt = require('jsonwebtoken')
const authroute = async (req , res ,next)=>{
    try{
        // const token =  req.header('Authorization').replace('Bearer ','')
        // const decodedToken = jwt.verify(token, '123')
        // const user = await Worker.findOne({_id : decodedToken._id, 'tokens.token':token})
        // if(!user) throw new Error("you should login first")
        // req.user = user
        // req.token = token
        // const path = req.path.toString().replace('/' ,"")
        // const worker = await Worker.findOne({ _id : decodedToken._id,'routes.route':path }) 
        // if(!worker){
        //     throw new Error("not auther to do it");
        // }

        const worker = await Worker.findOne({'routes.route': "admin" }) 
        if(!worker){
            throw new Error("not auther to do it");
        }

        next()
    }
    catch(e){
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'in auther route'
            })
        }
    } 
} 

module.exports= authroute