const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    //Check if the token is available
    if(!token){
        return res.status(401).json({ msg: 'No token, authrization denied'});
    }


    //Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        req.user = decoded.user;
        next(); //in all middlewares
    }
    catch(err){
        res.status(401).json({msg: 'Token is not valid'}); 
    }
    
}; 

