//Client Side

//Product.ejs
let addToCart = document.querySelectorAll('.AtcBtn');
let RmvCart = document.querySelectorAll('.RmvBtn')
//Layout.ejs
let cartCounter = document.querySelector('#CartCounter');


function updateCart(productitems) {
    axios.post('/update-cart',productitems).then(res =>{
      
        cartCounter.innerText = res.data.totalQty
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let productitems = JSON.parse(btn.dataset.productitems)
        updateCart(productitems)
        
        
    })
})


function removecart(productitems){
    axios.post('/remove-cart',productitems).then(res=>{
        cartCounter.innerText = res.data.totalQty
    })


}

RmvCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let productitems = JSON.parse(btn.dataset.productitems)
        removecart(productitems)
    })
})


