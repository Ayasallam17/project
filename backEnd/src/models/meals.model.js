const mongoose = require('mongoose')

const validator = require('validator')

const meals_schema=  new mongoose.Schema(
    {
    name:{
        type:String,
        trim:true,
        require:true
    },
    details:{
        type:String,
        trim:true,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
    ,img :{
        type:String,
        trim:true,
        require:true
    },
    cat:{
        type:String,
        trim:true,
        require:true
    },
    discount:{ 
        type:Number
    }
    

    
},
  {Timestamp:true}
)
const Meal = mongoose.model('Meal' , meals_schema )
module.exports=Meal