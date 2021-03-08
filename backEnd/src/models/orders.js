const mongoose = require('mongoose')

const order = new mongoose.Schema({
    mealname:{
        type:String,
        trim:true
    },
    mealdetails:{
        type:String,
        trim:true
    },
    count:{
        type:Number,
    },
    name:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    phone:{
        type:Number
    }

})
order.methods.toJSON = function(){
    const order = this.toObject()
    return order
}

const Order = mongoose.model('Order' , order)
module.exports = Order