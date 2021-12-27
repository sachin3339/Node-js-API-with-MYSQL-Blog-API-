const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');

function signup(req,res)
{
   models.User.findOne({where:{email:req.body.email}})
   .then(result=>{
    if(result){
        res.status(409).json({
        message:"Account Already exist with this email",
    });
    }
    else{
        bcryptjs.genSalt(10, function(err,salt){


        bcryptjs.hash(req.body.password,salt, function(err,hash){

        const user ={
            name:req.body.name,
            email:req.body.email,
            password:hash
        }
    
        models.User.create(user).then(result=>{
            res.status(201).json({
                message:"User Signed Up Successfully",
                post:result
            });
        })
        .catch(error=>{
           
        })

    }); 
    
    })
    }

    
   })
   
   .catch(error=>{
    res.status(500).json({
        message:"Something went wrong",
    });

   })


    
    

    
}


function login(req,res)
{
    models.User.findOne({where:{email:req.body.email}})
 .then(user=>{
     if(user===null)
     {
        res.status(401).json({
            message:"Invalid Credentials",
        });
     }

     else{
         bcryptjs.compare(req.body.password, user.password, function(error, result){
             if(result)
             {
                 const token=jwt.sign({
                     email:user.email,
                     userId:user.id
                 },'secret',function(err,token){
                    res.status(200).json({
                        message:"Authentication Successfull",
                        token:token
                    });

                 })
             }
             else{
                res.status(401).json({
                    message:"Invalid Credentials",
                });
             }

         })
     }
 })
 .catch(error=>{
    res.status(500).json({
        message:"Something went wrong",
    });
 })

}


module.exports={
    signup:signup,
    login:login
}