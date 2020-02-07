const router = require('express').Router();

const Users = require('./users-model.js');

const Auth = require('../auth/authenticate-middleware.js');

router.get('/:id', (req, res) => {

  const id = req.params.id;

    if(id){

      Users.findById(id)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
    } else {

      res.status(404).json({
        error: "User not found"
      })
    }
  });

  router.get('/',  (req,res)=> {

    Users.find()
    .then( users  => {
      res.json(users );
    })
    .catch( error => {

      res.status(400).json({
      error: "Unable to get users"
      
      })
    })
  })

 

  module.exports = router;