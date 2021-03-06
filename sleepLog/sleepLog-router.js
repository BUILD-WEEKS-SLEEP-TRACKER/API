const express = require('express');

const sleepLog = require('./sleepLog-model.js');
const Users = require('../users/users-model.js');

const restricted = require('../auth/authenticate-middleware.js');

const router = express.Router();

//CREATE A NEW SLEEP ENTRY LOG


router.post('/:id/create', restricted, validateUserId, (req,res)=>{ //THIS ID IS USER ID 
    const body = req.body;
    
    console.log("body", body);
    if(body){
    sleepLog.add(body)
    .then(log => {
        console.log('adding', body);
        res.status(201).json(log);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "Server was unable to add new log entry"
        })
    })
}   else {
    res.status(400).json({
        error: "Missing some data to create a new log entry"
    })
}
});

router.get('/logs', restricted, (req,res) => {

    console.log("is it showing up?")

    sleepLog.getAll()
    .then(logs => {
        console.log("is it working?");
        res.json(logs);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
        error:"Unable to get all sleep logs"
        })
    })
  
})

router.get('/journal', (req,res)=>{

    sleepLog.getAll()
    .then(logs => {
        res.json(logs);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error: "Unable to get all entries"
        })
    })
})



//GET ALL LOGS FOR A SPECIFIC USER

router.get('/:id/logs', restricted, validateUserId, (req,res) => { // this ID is USER ID
    console.log('does it show up');
    const id = req.params.id

    sleepLog.get(id)
    .then(logs => {
        res.json(logs);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:"Unable to get this users sleep logs"
        })
    })
});

//UPDATE A SPECIFIC LOG FOR A USER

router.put('/logs/:id', restricted, validateLogId, (req,res)=>{ // this ID is log ID 

    const {id} = req.params;
    const changes = req.body;

    sleepLog.update(id,changes)
    .then(log => {
        if(log){
            res.json({update: log})
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Server unable to edit sleep log"
        })
    })

})

//DELETE A LOG FOR A USER 

router.delete('/logs/:id', restricted, validateLogId, (req,res)=> { // this ID is log ID

    const {id} = req.params;

    sleepLog.remove(id)
    .then(count => {
        if(count){
            res.json({removed: count})
        }
    })
    .catch(error => {
        res.status(500).json({
            error: "Server unable to remove this log"
        })
    })

})

function validateUserId(req,res,next){
    const id = req.params.id;
    Users.findById(id)
    .then(verify => {
        if(verify){
            next();
        } else {
            res.status(404).json({
                error: "User not found -- Middleware"
            })
        }
    })
}

// router.use(validateUserId);

function validateLogId(req,res,next){
    const id = req.params.id;
    sleepLog.getById(id)
    .then(verify => {
        if(verify){
            next();
        } else {
            res.status(404).json({
                error: "Log not found -- Middleware"
            })
        }
    })
}

// router.use(validateUserId);



module.exports = router;