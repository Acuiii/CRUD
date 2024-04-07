const Product = require('../models/productModels')


// all logic in controller
// allow function from router to controller
// get all products
const getProducts = async(req,res) => {
    try {
         // use find all
         const products = await Product.find({})
         res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error,message})
    }
}

// get single product
const getProduct= async(req, res) => {
    try {
         // set id parameter and ufind by id
         const {id} = req.params
         const products = await Product.findById(id)
         res.status(200).json(products)
    } catch {
        res.status(500).json({message: error,message})
    }
}

//create product by post
const createProduct = async(req, res) => {
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
}

const updateProduct = async(req, res) => {
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
}

//delete product
const deleteProduct = async(req, res) => {
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
}

// import multiple export
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}