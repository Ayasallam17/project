const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt= require('bcryptjs')

const customers_schema=  new mongoose.Schema(
  {
    user_name:{ 
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Invalid Email')
        }
    },
    password:{
        type:String,
        minlength:7,
        required:true,
        trim:true,
        //match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
        
    },
    phone:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value,['ar-EG'])) throw new Error('invalid phone number')
        }
    },
    tokens:[
        { 
        token:{
            type:String
        }
    }
    ]

},

{Timestamp:true}
)

customers_schema.methods.generateToken = async function(){
    const customer = this
    const token = jwt.sign({_id:customer._id.toString()}, "123")
    customer.tokens = customer.tokens.concat({token})
    await customer.save()
    return token
}

customers_schema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}

customers_schema.pre("save" , async function(next){
    const customer = this
    if(customer.isModified('password'))
        customer.password = await bcrypt.hash(customer.password , 12)
    next() 
})
// customers_schema.statics.checkUniqEmail = async (email)=>{
//     const customer = await User.findOne({email})
//     if( customer ) throw new Error('email used before')
//     return customer
// }

customers_schema.statics.checkCustomerEmailAndPassword = async (email,password)=>{
    const customer = await User.findOne({email})
    if(!customer ) throw new Error('can not find this email')
    flag = await bcrypt.compare(password, customer.password)
    if(!flag) throw new Error('invalid password')
    return customer
}
const User = mongoose.model('User' , customers_schema )
module.exports=User

