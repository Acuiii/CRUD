const express = require('express')
const router = express.Router()

//import product model
//const Product = require('../models/productModels')

//import product controller
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

// all route in route
// call from productModels
// send/save data to mongodb
router.post('/', createProduct)

// get/fetch all products data from mongodb
router.get('/', getProducts)

//get/fetch single product data
router.get('/:id', getProduct)

//update product data and save to mongodb
router.put('/:id', updateProduct)

//delete a product data in mongodb
router.delete('/:id', deleteProduct)

//then export product routes
module.exports = router