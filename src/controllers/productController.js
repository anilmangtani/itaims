const product = require('../models/product')
function productController(){
    return{
        productpage(req, res){
            
            product.find().then(function(productitems){
                res.render('product.ejs',{productitems: productitems})
            })
            
        }
    }
}

module.exports = productController