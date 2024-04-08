// we cal also add mutiple api and do the same things like we did before
// add api/user, usercontroller, userroute, usermodel, user server path

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//import product routes to server.js
const productRoute = require('./routes/productRoute')

// import middleware error 
const errorMidleware = require('./middleware/errorMiddleware')

// dotenv 
require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

//json middleware so application can understand json
app.use(express.json())
//if not using json to send data but using form-data at postman
app.use(express.urlencoded({extended: false}))
//middleware productRoute
app.use('/api/products', productRoute)


// add middleware error function
// add this function after throw error
app.use(errorMidleware)

// get route (testing)
app.get('/', (req, res) => {
    res.send('Hello Node API')

    //// next, we apply custom middleware be more secure ////next part
    //// server response if enable throw new error
    //// server give information details, its not secure for api
    //// create middleware folder
    // throw new Error('Fake error')
    
})


app.get('/blog', (req, res) => {
    res.send('Hello Blog, my name is ')
})

/* test route after create product model at productModels.js save data to mongo */
// app.post('/product', (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })


  // connect mongodb then running on port 3000
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Server connected with MongoDB')
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
      })
}).catch((error) => {
    console.log(error)
})