const express = require('express')
const path    = require('path')
const cors    = require('cors')
const app     = express()
require('./config/db.config')  
//const PORT = 3000
const publicDir = path.join(__dirname, 'src/images')
const customerRoutes = require('./routes/customers.route')
const workerRoutes   = require('./routes/worker.route') 
const mealRoutes     = require('./routes/meals.route')
//app.use(express.static(publicDir))
app.use('/images', express.static(__dirname + '/images'))
app.use(express.json())
app.use(cors())  
app.use(customerRoutes)
app.use(workerRoutes)
app.use(mealRoutes)
app.get('', function(req, res){
    res.send({
        apistatues:true,
        message:"rest api works"
    })
})
var PORT = process.env.PORT || 3000
app.listen(PORT)   