const express = require('express')
const path = require('path')
require('./dbConnection/mongoose')
const cors = require('cors')
const app = express()

const PORT = 3000
const publicDir = path.join(__dirname, 'src/images')
const customerRoutes = require('./routes/customers.route')
const workerRoutes = require('./routes/worker.route') 
const mealRoutes = require('./routes/meals.route')
app.use(express.static(publicDir))
app.use(express.json())
app.use(cors())
app.use(customerRoutes)
app.use(workerRoutes)
app.use(mealRoutes)
app.listen(PORT)  