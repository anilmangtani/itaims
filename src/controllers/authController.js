const User = require('../models/auth')
const bcrypt = require('bcrypt')
const passport = require('passport');
function authController(){
    return{
        signup(req, res){
            res.render('signup.ejs')
        },
        async PostSignup(req,res){
            console.log('user entered his values')
            const {name, email, password} = req.body
            
            //checking if details are entered
            if(!name || !email || !password){
                req.flash('name',name)
                req.flash('email', email)
                req.flash("error","Enter your details")
                return res.redirect('/signup')

            }

            //checking if user is same by email
            User.exists({ email: email},(err, result)=>{
                if(result){
                    req.flash('error',"Email already taken")
                    return res.redirect('/signup')
                }
            })

            //Hased password
            const hashedPassword = await bcrypt.hash(password, 10)

            //Creat a user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword,
            })

            user.save().then(()=>{
                console.log(user.name)
                return res.redirect('/signup')
                
            }).catch(err=>{
                req.flash('something went wrong')
                return res.redirect('/signup')
            })

            
            
        },
        login(req,res){
            res.render('login.ejs')
        },
        postlogin(req,res,next){
            const {email, password} = req.body
            
            if(!email || !password) {
                req.flash('error','Enter your completer details')
                return res.redirect('/login')
            }

            passport.authenticate('local',(err, user, info)=>{
                if(err){
                    
                    req.flash('error', info.message)
                    return next(err)
                }

                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/')
                   
                })
            })(req,res,next)

        },

        logout(req, res){
            req.logout()
            return res.redirect('/')
        }
        
    }
}

module.exports = authController