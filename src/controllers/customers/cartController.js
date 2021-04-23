function cartController(){
    return{
        cart(req, res){
            res.render('cart.ejs')
        },

        update(req,res){

            // for the first time creating cart
            if(!req.session.cart){
                req.session.cart = {
                    items:{},
                    totalQty:0,
                    totalprice:0
                }
            }


            let cart = req.session.cart
            console.log(req.body)
            //check if items does not exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    items: req.body,
                    qty : 1
                }

                cart.totalQty = cart.totalQty + 1
                cart.totalprice = cart.totalprice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalprice = cart.totalprice + req.body.price
            }

            return res.json({ totalQty: req.session.cart.totalQty})
           
        },
        removecart(req,res){

            


            let cart = req.session.cart
            console.log(req.body)
            //check if items does not exist in cart
             
                cart.items[req.body._id].qty = cart.items[req.body._id].qty - 1
                cart.totalQty = cart.totalQty - 1
                cart.totalprice = cart.totalprice -  req.body.price
            

            return res.json({ totalQty: req.session.cart.totalQty})
            
        }

    }
}

module.exports = cartController