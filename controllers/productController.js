const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/productModels')

const asyncHandler = require('express-async-handler')


// all logic in controller
// allow function from router to controller
// get all products
const getProducts = asyncHandler(async(req,res) => {
    try {
         // use find all
         const products = await Product.find({})
         res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
        //res.status(500).json({message: error,message})
    }
})

// get single product
const getProduct= asyncHandler(async(req, res) => {
    try {
         // set id parameter and ufind by id
         const {id} = req.params
         const products = await Product.findById(id)
         res.status(200).json(products)
    } catch (error) {
        // we add throw message and need to install express async handler
        // see documentation
        // add asyncHandler
        res.status(500)
        throw new Error(error.message)
        //res.status(500).json({message: error,message})
    }
})


//create product by post
const createProduct = asyncHandler(async(req, res) => {
    try{
        //put async andd await because we interact with database
        //create new product body
        // we can see created and updated also id
        const products = await Product.create(req.body)
        res.status(200).json(products)
    } catch (error){
        res.status(500)
        throw new Error(error.message)
        //res.status(500).json({message: error,message})
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        // we cannot find any product id in database
        if(!product){
            res.status(404)
            throw new Error(`cannot find any product by ID ${id}`)
            // return res.status(404).json({message: 'cannot find any product by ID ${id}'})
        }
        //  get latest update data
        // dont want to double check after update
        // insert findById not findByIdAndUpdate
        const updatedId = await Product.findById(id)
        res.status(200).json(updatedId)
    } catch(error){
        res.status(500)
        throw new Error(error.message)
        //res.status(500).json({message: error,message})
    }
})

//delete product
const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404)
            throw new Error(`cannot find any product by ID ${id}`)
            //res.status(500).json({message: error,message})
            //return res.status(404).json({message: 'cannot find any product by ID ${id}'})
        }
        res.status(200).json(product)
    } catch(error){
        res.status(500)
        throw new Error(error.message)
        //res.status(500).json({message: error,message})
    }
})

// import multiple export
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}