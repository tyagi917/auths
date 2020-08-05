const bcrypt=require('bcryptjs');
const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const router =express.Router();
const User=mongoose.model('User');
const{JWT_SECRET}=require( '../key');
const requirelogin=require('../middleware/requirelogin');
router.get('/protected',requirelogin,(req,res)=>
{
	res.send("HELLO");
	
})

router.post('/signup',(req,res)=>{

  const {name,email,password} = req.body 
  if(!email || !password || !name){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
               
            })
    
            user.save()
            .then(user=>{
                // transporter.sendMail({
                //     to:user.email,
                //     from:"no-reply@insta.com",
                //     subject:"signup success",
                //     html:"<h1>welcome to instagram</h1>"
                // })
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})
router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const{_id,name,email}=savedUser
               res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})










	
			
			
	

module.exports=router;
