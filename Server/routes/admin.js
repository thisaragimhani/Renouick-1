// all routes related to customer info
const express = require('express');
const router = express.Router();
//customer schema
const Admin = require('../models/Admin.model');
const User = require('../models/User.model');
const auth = require('../middleware/authMiddleware');
//for deleting pictures
var cloudinary = require('cloudinary');




//WHEN ACCESSING PARAMS PASSED FROM THE CLIENT - don't use params . use query - eg - req.query.email

//@route GET /customer/getInfo
//@desc get all info of a specific customer
//@access private
router.get('/getInfo', auth, (req, res) => {
    const email = req.query.email
    Admin.findOne({email: email }, (err, info) => {
        if(err)
            console.log(err);

        else 
        console.log(info);   
            res.json(info);    
    })
    
})

//@route POST /customer/updatePw
//@desc update customer password
//@access private
router.post('/updatePw', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    Admin.findOne({email: email}, (err, admin) => {
        if(!admin) {
            res.status(404).send('user is not found');
        }
        else {
            admin.password = password;
            admin.save().then(responce => {
                res.json("password updated")
            })
            .catch(err => {
                res.status(400).end("Update not possible");
            })
        }

    })
    User.findOne({email: email}, (err, user) => {
        if(!user) {
            res.status(404).send('user is not found');
        }
        else {
            user.password = password;
            user.save().then(responce => {
                res.json("password updated")
            })
            .catch(err => {
                res.status(400).end("Update not possible");
            })
        }

    })
    
})


//@route POST /customer/updateCustomer
//@desc update customer info
//@access private
router.post('/updateAdmin', (req,res) => {
    const updatedAdmin = req.body;
    //console.log(updatedCustomer);
    Admin.findOne({email: updatedAdmin.email}, (err,admin) => {
        if(!admin) {
            res.status(404).send('user is not found');
        }
        else {
            admin.firstName = updatedAdmin.firstName;
            admin.lastName = updatedAdmin.lastName;
            admin.contactNumber = updatedAdmin.contactNumber;
            admin.email = updatedAdmin.email;
            admin.userName = updatedAdmin.userName;
            admin.password = updatedAdmin.password;
            console.log(admin);
            admin.save().then(responce => {
                res.json("user info updated")
            })
            .catch(err => {
                res.status(400).end("Update not possible");
            })
        }
    })
})

module.exports = router;