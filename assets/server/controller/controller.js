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
        const response = await user.save();     
        return res.status(200).json(response);
    }
    catch(err)
    {
        return res.status(500).json({message:err || 'error while adding user...'})
    }
}

// retrive users
exports.find = (req, res) =>{

}

// update user
exports.update = (req, res) =>{

}

// delete user
exports.delete = (req, res) =>{

}