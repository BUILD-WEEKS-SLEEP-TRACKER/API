const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require('../auth/config/secret.js')

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.post('/login', (req, res) => {
    let { email, password } = req.body;
  console.log({email});
  console.log({password});
    Users.findBy(email)
      .first()
      .then(user => {
          console.log('User -->', user)
        if (user && bcrypt.compareSync(password, user.password)) {
  
          const token = signToken(user); // <<<<<<<<<<<
          console.log("token", token);
  
          res.status(200).json({ 
              
              message: `Welcome back ${user.firstName}`,
              userId: user.id,
              token: token,
          }); // <<<<<<<<<<
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
          console.log("Error 500  -- unable to log in")
        res.status(500).json(error);
      });
  });

  function signToken(user){
    const payload={
        //whatever data we want to save.
        firstName: user.firstName,
        userId: user.id

    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;