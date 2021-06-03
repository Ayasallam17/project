const custModel = require('../models/customers.models')
const authMe= require('../middleware/authMe')
const express = require('express')
const router = new express.Router()
const Meal = require('../models/meals.model')
const Order = require('../models/orders')
router.post('/confirmorder' , authMe, async (req , res) =>{
    const order = new Order(req.body)
    maxNum = 7
    try { 
    await custModel.findOneAndUpdate({_id :req.user._id}, 
        {
            $inc:{
                max_orders:1
            }
    })
    //C:\Users\aya\Desktop\Retaurant\backEnd\src\images
    //src\images
    console.log(req.user)
    if(req.user.max_orders> maxNum) throw new Error(`not allow order more than ${maxNum} `)
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
// user regiter
router.post('/user/register' , async (req , res) =>{
    const customerData = new custModel(req.body)
    customerData.max_orders = 0
    try { 
    await customerData.save()
    //console.log(customerData)
    res.status(200).send({
        apistatus:true,
        data:customerData,
        message:'customer registered successfuly'
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


router.post('/user/login' , async(req,res)=>{
    try{
        user = await custModel.checkCustomerEmailAndPassword(req.body.email, req.body.password)
        const token =  await user.generateToken()
        res.status(200).send({
            apistatus:true,
            data:user,
            token:token,
            message:'user login'
            
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

router.post('/user/logout', authMe, async(req,res)=>{
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
router.post('/user/logoutAll',authMe, async(req,res)=>{
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

router.get('/user/me',authMe, async(req,res)=>{
    res.status(200).send({
        error: null,
        apiStatus:true,
        data: {user:req.user}
    })
})
router.post('/showallbreakfast',async(req,res)=>{
    const cat = req.body.cat
    try{
        const meals = await Meal.find({cat})
        res.status(200).send({
            apistatus:true,
            data:meals,
            message:'all meals'
            
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in showing meals'
            })
        }
})
router.post('/showalllunch',async(req,res)=>{
    const cat = req.body.cat
    try{
        const meals = await Meal.find({cat})
        res.status(200).send({
            apistatus:true,
            data:meals,
            message:'all meals'
            
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in showing meals'
            })
        }
})
router.post('/showalldinner',async(req,res)=>{
    const cat = req.body.cat
    try{
        const meals = await Meal.find({cat})
        res.status(200).send({
            apistatus:true,
            data:meals,
            message:'all meals'
            
        })
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in showing meals'
            })
        }
})
router.post('/orderitem/:id',  authMe , async(req,res)=>{
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
//auther the admin to edit something
router.post('/editprice',authMe  ,async(req , res)=>{
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

// user login

 
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

