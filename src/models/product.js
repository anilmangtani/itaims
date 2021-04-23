const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    
    name:{type:String, require:true},
    img:{type:String, require:true},
    price:{type:Number, require:true}
})

const productitems = mongoose.model('productitems', productSchema)
module.exports = productitems