const Worker = require('../models/worker.model')
const authsuper = async (req , res ,next)=>{
    try{
        const worker = await Worker.findOne({'user_id':req.user.user_id, 'role': "super" }) 
        if(!worker){
            throw new Error("not auther to do it not super");
        }

        next()
    }
    catch(e){
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'auth rotes'
            })
        }
    } 
} 

module.exports= authsuper