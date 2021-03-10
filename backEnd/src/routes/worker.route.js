
const express = require('express')
const router = new express.Router()
const authroute = require('../middleware/authroute')
const Worker = require('../models/worker.model')
const Meal = require('../models/meals.model')
const Order = require('../models/orders')
const authWorker = require('../middleware/authWorker')

router.post('/worker_register' , async (req , res) =>{
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

router.post('/worker/login', async(req,res)=>{
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
router.post('/worker/logout', authWorker, async(req,res)=>{
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
router.post('/showorders', async(req,res)=>{
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
 
router.post('/deleteorder/:id', async(req,res)=>{
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
