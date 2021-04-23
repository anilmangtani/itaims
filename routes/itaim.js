const express = require('express')
const router = express.Router()
const authController = require('../src/controllers/authController')
const guest  = require('../src/middlewares/guest')
const productController = require('../src/controllers/productController')
const cartController = require('../src/controllers/customers/cartController')

router.get('/')
router.get('/signup',guest,authController().signup)
router.post('/signup',authController().PostSignup)
router.get('/login',guest, authController().login)
router.post('/login',authController().postlogin)
router.post('/logout',authController().logout)

//home page route
router.get('/',productController().productpage)
//cart page route
router.get('/cart',cartController().cart)
router.post('/update-cart',cartController().update)
router.post('/remove-cart',cartController().removecart)
module.exports = router