var jwt = require('jsonwebtoken');

//authentication middleware
exports.verify_token = function(req, res, next) {
    //get current token from header
    let auth_header = req.headers.authorization;
    if(auth_header == undefined)
    {
        res.status(401).send({status:false,message: "No token provided"});
    }
    else
    {   
        let token = auth_header.split(".")[1];
        jwt.verify(auth_header, 'elearning', function(err, decoded) {
            if(decoded)
            {
                var current_timestamp = new Date().getTime() / 1000;
                var expiry_date = (new Date().getTime() / 1000) + decoded.expiresIn;
                //checking expiry
                if(expiry_date >= current_timestamp)
                {
                    req.user_id = decoded.user_id;
                    req.user_email = decoded.user_email;
                    req.user_name = decoded.user_name;
                    req.user_role = decoded.user_role;
                    (err) ? res.status(500).send({status:false,message:"Authentication failed"}):  next();
                }
                else
                {
                    res.status(500).send({status:false, message: "Token expired"});
                }
            }
            else
            {
                res.status(200).send({status:false, message: "Invalid token"});
            }
        });
                        
    }       
};
