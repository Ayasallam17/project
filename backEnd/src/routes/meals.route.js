const express = require('express')
const router = new express.Router()
const Meal = require('../models/meals.model')
const multer = require('multer')
const authroute = require('../middleware/authroute')


let storage = multer.diskStorage({
     
    limits:{fileSize:1},
    destination: function(req , file , cb){  
        cb(null, "images")
    }
     ,
    filename:function(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|png)$/)){
            return cb(new Error('error'))
        }
      cb(null, Date.now()+'.'+file.originalname.split('.').pop())
    }
    
}) 
let upload = multer({storage})
router.post('/addmeal', upload.single('meal') , async(req , res)=>{
    const meal = new Meal(req.body)
    console.log(req.body)
    try{
        meal.img = `${req.file.destination}/${req.file.filename}`
        await meal.save()
        res.status(200).send({
            apistatus:true,
            data: meal,
            message:'meal added'
            
        }) 
        }catch(e)
        {
            res.status(400).send({
                apistatus:false,
                data: e.message,
                message: 'error in adding meal'
            })
        }
 })

 router.post('/getmeal/:id', async(req,res)=>{
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
router.post('/updatemeal', async(req,res)=>{
    //_id = req.params.id
    console.log(req)
    try{
       // meal = await Meal.findByIdAndUpdate(_id)
       // await meal.save()
        res.status(200).send({
            status:1,
            data:"koo",
            message:'meal updates successfuly'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'can not update this meal'
        })
    }
})


module.exports = router