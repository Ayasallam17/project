const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt= require('bcryptjs')
const workers=  new mongoose.Schema(
  {
    user_id:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    addresses:[
        {
            addr_type:{
                type:String,
                trim:true,
                require:true
            },
            details:{
                type:String,
                trim:true,
                //require:true
            }
        }
    ] ,
    phone:{
        type:String,
        require:true
    },
    role: 
        {
            type:String,
            trim:true,
            require:true,
            null:false
        }
      , 
     tokens:[
        { 
        token:{
            type:String,
            require:true
        }
     }
     ]

},

{Timestamp:true}
)

workers.methods.generateToken = async function(){
    const customer = this
    const token = jwt.sign({_id:customer._id.toString()}, "123")
    customer.tokens = customer.tokens.concat({token})
    await customer.save()
    return token
}

workers.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}

workers.pre("save" , async function(next){
    const customer = this
    if(customer.isModified('password'))
        customer.password = await bcrypt.hash(customer.password , 12)
    next() 
})
workers.statics.checkUniqUserId = async (user_id)=>{
    const customer = await Worker.findOne({user_id})
    if( customer ) throw new Error('this id used before')
    return customer
}

workers.statics.checkWorkerUserIdAndPassword = async (user_id,password)=>{
    const customer = await Worker.findOne({user_id})
    if(!customer ) throw new Error('can not find this user id')
    flag = await bcrypt.compare(password, customer.password)
    if(!flag) throw new Error('invalid password')
    return customer
}
const Worker = mongoose.model('Worker' , workers )
module.exports= Worker

