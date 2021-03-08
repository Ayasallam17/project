const mongoose = require('mongoose')
const validator = require('validator')

const meals_schema=  new mongoose.Schema(
    {
    name:{
        type:String,
        trim:true
    },
    details:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
    }
    ,img :{
        type:String
    },
    cat:{
        type:String
    }
},
  {Timestamp:true}
)
const Meal = mongoose.model('Meal' , meals_schema )
module.exports=Meal