var express = require('express');
var router = express.Router();
var models=require('../models/models');
var userController=require('../controller/userController');
var jwt = require('jsonwebtoken');
const authentication =  require('../modules/authentication');


//token creation
router.post("/generateToken", (req, res) => {
    console.log("bodyyyyy",req.body)
    let jwtSecretKey = "elearning";
    let data = {
        expiresIn : 60*60*24,
        user_id : req.body.user_id,
        user_email :req.body.user_email,
        user_name :req.body.user_name,
        user_role : req.body.user_role
    }
  
    const token = jwt.sign(data, jwtSecretKey);
    console.log("tokennnn",token)
    res.send(token);
});

// jwt authentication and course creation
router.post('/create', authentication.verify_token,async function (req, res) {
    console.log("req.body",req.body.user_role)
    if(req.body.user_role == "teacher")
    {
       //checking the count of course  by using email-id
       var data=await userController.checkCount(req.body.user_id);
       console.log("data",data)
       if(data.length < 3 )
       {
          // checking time overlapping
          var found = data.find(function (element) {
            if(element.start_time <= req.body.start_time && element.end_time <= req.body.end_time || element.end_time <= req.body.start_time && element.end_time <= req.body.end_time) 
            {
                console.log("Course created")
            }
            else
            {
                console.log("Sorry.Time overlapping is there")
            }
        });

       }
       else
       {
        console.log("Sorry. you can't create course more than three")
       }

    }
    else
    {
        console.log("Invalid user")
    }
}) ;

// student login
router.post('/studentLogin', authentication.verify_token,async function (req, res) {
    console.log("req.body",req.body)
    if(req.body.user_role == "student")
    {
       //checking whether the student is active or not to avoid multiple joining
       var studentActive=await userController.studentActive(req.body.user_id);
       console.log("ddddd",studentActive)
       if(studentActive.length == 0)
       {
            console.log("You can join now")
       }
       else
       {
            console.log("Sorry . You can't join more than one course at a time")
       }

    }
    else
    {
        console.log("Invalid user")
    }
}) ;


module.exports = router;
