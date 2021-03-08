
const mongoose = require('mongoose')
const User = require('../models/customers.models')
const roleSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
})

roleSchema.virtual('usersRole' , {
    ref:'User',
    localField:'_id',
    foreignField:'role_id'
})
roleSchema.virtual('userRole' , {
    ref:'User',
    localField:'_id',
    foreignField:'role_id`'
})

const Role = mongoose.model('Role' , roleSchema)
module.exports=Role