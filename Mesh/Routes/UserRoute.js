const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const Constants=require('../Extras/Constants');



//to get all users
router.get("/",function(req,res){


    console.log("hello");
    var result = new Object();

  User.find((err,users)=>{
    
        if(err)
        {
            result.error=err.message;
            res.status(Constants.RESPONSE_FAIL).json(result);
        }else
        { 
          result.count=users.length;
          result.users =users;
          result.success=true; 
          res.status(Constants.RESPONSE_SUCCESS).json(users);
        }
  })
})
 
//to get 1 user : working fine

router.get("/:id",(req,res)=>{
{
    var result = new Object();
    var id = req.params.id;
 //   var criteria = {_id:id};
    User.findById(id) 
    .then((user)=>{
        if(user)
        {
            result.success=true;
            result.user=user;
            res.status(Constants.RESPONSE_SUCCESS).json(result);
        }else
        {
            result={error :"User not found"};
            res.status(Constants.RESPONSE_EMPTY).json(result);
        }
    })
    .catch((err)=>{
        result.error=err.message;
        res.status(Constants.RESPONSE_FAIL).json(result);
    })
}
});
//for login : working fine
router.post("/login",function(req,res){

    var result= new Object();
    var email=req.body.email;
    var pass=req.body.password;
    var criteria = {email:email,password:pass};
    User.findOne(criteria)
    .then((user)=>{

        if(user)
        {
            result.user=user;
            result.success=true;
            result.request={
                url:Constants.URL+"/users/"+user["_id"],
                method:"GET"
            }
            res.status(Constants.RESPONSE_SUCCESS).json(result);
        }else{

            result.user=null;
            result.error="No User Found";
            res.status(Constants.RESPONSE_EMPTY).json(result);
        }

    })
    .catch((err)=>{
        result.error=err.message;
        res.status(Constants.RESPONSE_FAIL).json(result);
    });



})

//to save user : WORKING FINE
router.post("/",function(req,res){

       var u = {
            name:req.body.name,
            password: req.body.password,
            email:req.body.email
    }
    var result= new Object();

        User.create(u).then((user)=>{
           
            result.user = user;
            result.success=true;
            result.request={
                url:Constants.URL+"/users/"+user["_id"],
                method:"GET"
            }
         
            res.status(Constants.RESPONSE_SUCCESS).json(result);
            console.log(user);
        }).catch((err)=>{
         
           
            result.success=false;
            result.error=err.message;
            res.status(Constants.RESPONSE_FAIL).json(result);
        })
            
     
})  

//to delete 
router.delete("/:id",function(req,res){

    var result= new Object();
  //  res.end(req.params.id);
    User.findByIdAndRemove({_id:req.params.id}).then((user)=>{
      
      if(user)
      {
        result["success"]=true;
        result.user=user;  
        res.status(Constants.RESPONSE_SUCCESS).json(result);
      }else{
          result.error="User Not found !";
          res.status(Constants.RESPONSE_EMPTY).json(result);
      }

    }).catch((err)=>{
        result.error=err.message;
        res.status(Constants.RESPONSE_FAIL).json(result);
    });

})

//to edit user info (generic function)
router.put("/edit/:id",function(req,res){

    var id = req.params.id;
    var updation =new Object();
    var obj = req.body;     
    for(var i =0;i<obj.length;i++)
    {
        updation[obj[i]["propName"]]=obj[i]["value"];
    }
    User.findByIdAndUpdate(id,updation)
    .then((result)=>{
        if(result)
        {

            User.findById(id).then((user)=>{
                res.status(Constants.RESPONSE_SUCCESS).json({
                success:true,
                user:user
                });
            })
        }else{
            
            res.status(Constants.RESPONSE_EMPTY).json({
                error:"No user found agains _id:"+id
            })
        }

    })
    .catch((err)=>{

        res.status(Constants.RESPONSE_FAIL).json({
            error:err.message
        });

    });

    
    


})
router.get("/sendVerification:id",function(req,res){

    
})


module.exports=router;