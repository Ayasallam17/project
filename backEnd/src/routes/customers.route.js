const custModel = require('../models/customers.models')
const authMe    = require('../middleware/authMe')
const authAdmin = require('../middleware/authroute')
const express   = require('express')
const router    = new express.Router()
const Meal      = require('../models/meals.model')
const Order     = require('../models/orders')
 
router.post('/users/registeration' , async (req , res) =>{
    const customerData = new custModel(req.body)
    //customerData.max_orders = 0
    try { 
    await customerData.save()
    res.status(200).send({
        apistatus:true,
        data:customerData,
        message:'you registered successfuly'
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

router.post('/users/login' , async(req,res)=>{
    try{
        user = await custModel.checkCustomerEmailAndPassword(req.body.email, req.body.password)
        const token =  await user.generateToken()
        res.status(200).send({
            apistatus:true,
            data:user,
            token:token,
            message:'you are login' 
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

router.post('/users/logout', authMe, async(req,res)=>{
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
router.post('/users/logoutall',authMe, async(req,res)=>{
    try{
        req.user.tokens = []
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
router.post('/meals/breakfast' , async(req , res)=>{
    const cat = req.body.cat
    try{
        const meals = await Meal.find({cat})
        res.status(200).send({
            apistatus:true,
            data:meals,
            message:'all breakfast meals'   
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in showing breakfast meals'
            })
        }
})
router.post('/meals/lunch',async(req,res)=>{
    const cat = req.body.cat
    try{
        const meals = await Meal.find({cat})
        res.status(200).send({
            apistatus:true,
            data:meals,
            message:'all lunch meals'   
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in showing lunch meals'
            })
        }   
})
router.post('/meals/dinner',async(req,res)=>{
    const cat = req.body.cat
    try{
        const meals = await Meal.find({cat})
        res.status(200).send({
            apistatus:true,
            data:meals,
            message:'all dinner meals'
            
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in showing dinner meals'
            })
        }
})
router.post('/users/order-meal/:id',  authMe , async(req,res)=>{   //choice item to order
    _id = req.params.id
    try{
        meal = await Meal.findById(_id)
        res.status(200).send({
            status:1,
            data:meal,
            message:'your specified meal'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'can not find this meal'
        })
    }
})
router.post('/users/confirmation-order' , authMe, async (req , res) =>{  //confirm order this item
    const order = new Order(req.body)
    //maxNum = 7
    try { 
    // await custModel.findOneAndUpdate({_id :req.user._id}, 
    //     {
    //         $inc:{
    //             max_orders:1
    //         }
    // })
    //C:\Users\aya\Desktop\Retaurant\backEnd\src\images
    //src\images
    //console.log(req.user)
    //if(req.user.max_orders> maxNum) throw new Error(`not allow order more than ${maxNum} `)
    await order.save()
    res.status(200).send({
        apistatus:true,
        data:order, 
        message:'confirme order'  
    }) 
    }catch(e)
    {
        res.status(400).send({
            apistatus:false, 
            data: e.message,
            message: 'error in confirm order'
        })
    }
})
//auther the admin to edit something
router.post('/editprice', authMe , authAdmin ,async(req , res)=>{
    try{ 
        res.status(200).send({
            message:"you can modified price",
            error:false
        })
    }
    catch(e){
        res.status(400).send({
            data:e.message,
            message:"not auther to modify",
            error:true
        })
    }
})
 
// worker show the user's orders
router.get('/showallcustomer', async(req,res)=>{
    try{
        const customers = await custModel.find()
        res.status(200).send({
            status:1,
            data:customers,
            message:'all customer data showed'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error  in showing customres data'
        })
    }
})
// user can edit his info
router.patch('/updatecustomer/:id', async(req,res)=>{
    availableUpdates = ['custName', 'custEmail', 'custTelephone' , 'password' ]
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('can not update')
        await custModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await custModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'can not update'
        })
    }
})
// user can remove his account
router.delete('/deletecustomer/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await custModel.findByIdAndDelete(id)
        res.status(200).send({
            status:1,
            data:'',
            message:'deleted'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error delete customer'
        })
    }
})
// user can logout
router.post('user/logout',authMe,async(req,res)=>{
    try{
        req.custModel.tokens = req.custModel.tokens.filter(single =>{
            return single.token != req.token
        })
    
    await req.custModel.save()
    res.send('logged out')
}
    catch(e){

    }
})
// user can see his info to edite it
router.get('/profile', authMe, async(req,res)=>{
    res.send(req.user)
})

module.exports = router

