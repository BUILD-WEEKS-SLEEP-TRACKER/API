const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./config/secret.js');


module.exports = (req, res, next) => {

    const token = req.headers.authorization;
    
    if(token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
    
          if(err){
            //token is not valid
            res.status(401).json({error: "error verifying token"})
          } else {
              console.log("Decoded token", decodedToken);
            req.user_id = decodedToken.userId;
            next();
          }
      })
    } else {
      res.status(401).json({you: "need to log in first"})
    }
    
    };