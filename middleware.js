const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    try{
         const token = req.headers('x-token');
         if(!token){
            return res.status(401).send('Token NOT Found');
         }
         let decoded = jwt.verify(token,'jwtPassword');
         req.user = decoded.user;
         next();
    }
    catch(err){
        console.log(err);
        return res.status(400).send('Authentication Error');
    }
}