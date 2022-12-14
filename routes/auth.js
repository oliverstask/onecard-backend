const express = require('express');
const router = express.Router();
require ('../models/connections');
const User = require('../models/users')
const checkBody  = require('../modules/checkBody');
const createUser = require('../modules/createUser');
const bcrypt = require('bcrypt');


router.post('/signup', async function(req,res){
    //Check if some fields are empty
    if (!checkBody (req.body, ['firstName', 'lastName', 'email', 'password'])){
      res.json({ result: false, error : 'Missing or empty fields'})
    return;
    }

    const {firstName, lastName, email, password } = req.body
    // Check if the user has not already been registered
    const found = await User.findOne({email})
    if (!found) {
      const newUser = await createUser(firstName, lastName, email, false, password)
      res.json({
        result: true, 
        message: 'New user created',
        token: newUser.token,
        userId: newUser._id,
        socialLogin: newUser.socialLogin
      })
    }  else {
      // User already exists in database
      res.json({ result: false, message: 'User already exists' });
    }
      
})
; 
  

router.post('/signin', async(req,res)=> {
    if (!checkBody(req.body, ['email','password'])){
      res.json({ result: false, message:'Missing or empty fields'})
      return;
    }
  
    const { email, password } = req.body
    const found = await User.findOne({email})
    console.log(found)
   if (!found) {
    res.json ({result: false, message: 'Wrong email or password'})
   } else if (found.socialLogin) {
    res.json ({result: false, message: 'Social login detected, please connect with it'})
   }  else if (bcrypt.compareSync(password, found.password)) {
      res.json({ 
        result: true, 
        token: found.token,
        userId: found._id,
        message: 'User connected',
        socialLogin: found.socialLogin
      });
    } else {
      res.json ({result: false, message: 'Wrong email or password'})
    }
})

  
router.post('/sociallogin', async(req, res)=> {
  const { firstName, lastName, email } = req.body
  const found = await User.findOne({email})
  if (!found) {
    const newUser = await createUser(firstName, lastName, email, true)
    res.json({
      result: true, 
      message: 'New user created',
      token: newUser.token,
      userId: newUser._id,
      socialLogin: newUser.socialLogin
    })
  } else {
    
    res.json({
      result: true, 
      message: 'User found in the db',
      token: found.token,
      userId: found._id,
      socialLogin: found.socialLogin
    })
  }
})



module.exports = router;
