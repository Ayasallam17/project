
const express = require('express')
const router = new express.Router()
const authsuper = require('../middleware/authsuper')
const Worker = require('../models/worker.model')
const Meal = require('../models/meals.model')
const Order = require('../models/orders')
const authWorker = require('../middleware/authWorker')

router.post('/workers/registeration' , authWorker, authsuper,  async (req , res) =>{  // adim id = 1 pass:123
    const worker = new Worker(req.body)
    try { 
    await Worker.checkUniqUserId(req.body.user_id)
    await worker.save()
    res.status(200).send({ 
        apistatus:true,
        data:worker,
        message:'worker registered successfuly'   
    })
    }catch(e)
    {
        res.status(400).send({
            apistatus:false,
            data: e.message,
            message: 'error in registeration'
        })
    }
})

router.post('/workers/login', async(req,res)=>{
    try{
        worker = await Worker.checkWorkerUserIdAndPassword(req.body.user_id, req.body.password)

        const token = await worker.generateToken()
        res.status(200).send({
            apistatus:true,
            data:worker,
            token:token,
            route:worker.route,
            message:'worker login'   
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in login'
            })
        }
})
router.post('/workers/logout', authWorker, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((singleToken)=>{
            return singleToken.token != req.token
        })
        await req.user.save()
        res.status(200).send({
            error: null,
            apiStatus:true,
            data: 'logged out successfully'
        })
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: error.message
        })
    }

})
router.post('/workers/orders', authWorker , async(req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).send({
            apistatus:true,
            data:orders,
            message:'orders'
            
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in show orders'
            })
        }
})
 
router.delete('/workers/order/:id', authWorker, async(req,res)=>{
    const id = req.params.id
    await Order.findByIdAndRemove(id)
    try{
        res.status(200).send({
            apistatus:true,
            data:"deleted",
            message:'orders'
            
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in delete order'
            })
        }
})
 
 
module.exports=router
