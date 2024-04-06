// call mongoDB to connect with product
const mongoose = require('mongoose') 

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require: [true, "Please enter a product name"]
        },
        quantity:{
            type: Number,
            require: true,
            default: 0
        },
        price:{
            type: Number,
            require: true,
        },
        image:{
            type: String,
            require: false,
        }
    },
    //created and updated timestamps
    {
        timestamps: true
    }
)

//the create product module
const Product = mongoose.model('Product', productSchema)

//then export product
module.exports = Product