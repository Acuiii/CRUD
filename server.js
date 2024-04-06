const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

//json middleware so application can understand json
app.use(express.json())
//if not using json to send data but using form-data at postman
app.use(express.urlencoded({extended: false}))
//import product model
const Product = require('./models/productModels')


// get route 
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, my name is ')
})

/* test route after create product model at productModels.js save data to mongo */
// app.post('/product', (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })

// call from productModels
// send/save data to mongodb
app.post('/products', async(req, res) => {
    try{
        //put async andd await because we interact with database
        //create new product body
        // we can see created and updated also id
        const products = await Product.create(req.body)
        res.status(200).json(products)
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


// get/fetch all products data from mongodb
app.get('/products', async(req,res) => {
    try {
         // use find all
         const products = await Product.find({})
         res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error,message})
    }
})


//get/fetch single product data
app.get('/products/:id', async(req, res) => {
    try {
         // set id parameter and ufind by id
         const {id} = req.params
         const products = await Product.findById(id)
         res.status(200).json(products)
    } catch {
        res.status(500).json({message: error,message})
    }
})


//update product data and save to mongodb
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        // we cannot find any product id in database
        if(!product){
            return res.status(404).json({message: 'cannot find any product by ID ${id}'})
        }
        //  get latest update data
        // dont want to double check after update
        // insert findById not findByIdAndUpdate
        const updatedId = await Product.findById(id)
        res.status(200).json(updatedId)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})


//delete a product data in mongodb
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: 'cannot find any product by ID ${id}'})
        }
        res.status(200).json(product)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})


  // connect mongodb then running on port 3000
mongoose.connect('mongodb+srv://admin:admin@registrationtutorial.hlaeugp.mongodb.net/Node-API?retryWrites=true&w=majority&appName=RegistrationTutorial')
.then(() => {
    console.log('Server connected with MongoDB')
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
      })
}).catch((error) => {
    console.log(error)
})