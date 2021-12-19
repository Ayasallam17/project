const mongoose = require("mongoose")
const env = require('./env')
mongoose.connect(`${env.dialect}://${env.host}:${env.port}/${env.database}` , {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology: true
}) 