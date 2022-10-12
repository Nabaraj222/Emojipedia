const { response } = require('express');
var Userdb = require('../model/model');

// create and save a new user
exports.create = async (req, res) =>{
    
    // validate request
    if(!req.body)
    {
        res.status(400).send({message:'Content can not be empty'});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    
    // save to database 
    try{
        const response = await user.save()
        .then(data => {
            res.redirect("/");
        });     
        //return res.status(200).json(response);
    }
    catch(err)
    {
        return res.status(500).json({message:err || 'error while adding user...'})
    }
}

// retrive users
exports.find = (req, res) =>{
if(req.query.id)
{
 const id = req.query.id;

 Userdb.findById(id)
 .then(data =>{
     if(!data)
     {
        res.status(404).send({message:"user not found."})
     }
     else{
        res.send(data);
     }
 })
 .catch(err=>{
    res.status(500).send({message:"error occurred while retrieving user with id: &{id}"});
 })
}
else{
    Userdb.find()
    .then(user => {
        res.send(user);
    })
    .catch(err =>
    {
        return res.status(500).send({message:err || 'error while finding user...'})
    })   
}
}

// update user
exports.update = (req, res) =>{
if(!req.body)
{
    return res.status(400).send({message:'data cannot be empty.'})
}
const id = req.params.id;
Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
.then(data =>{
    if(!data)
    {
        res.status(404).send({message:"can not update user with ${id}, User not found."})
    }
    else{
        res.send(data)
    }
})
.catch(err =>{
    return res.status(500).send({message:err || 'error while updating user...'})
})
}

// delete user
exports.delete = (req, res) =>{
const id = req.params.id;

Userdb.findByIdAndDelete(id)
.then(data=>{
    if(!data)
    {
        res.status(404).send({message:"can not delete user with ${id}, User not found."})
    }
    else{
        res.send({message:"User is deleted successfully."})
    }
})
.catch(err =>{
    res.status(500).send({message:"error occurred while deleting user."});
});
}