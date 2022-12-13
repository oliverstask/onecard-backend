var express = require('express');
var router = express.Router();

require ('../models/connections');
const Auth = require('../models/auths')
//const Setting = require('../models/settings')
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


router.post('/signup', async function(req,res){
  
  if (!checkBody (req.body, ['firstName', 'lastName', 'email', 'password'])){
    res.json({ result: false, error : 'Missing or empty fields'})
  return;
  }

  const hash = bcrypt.hashSync(req.body.password, 10)

  const newUser = await new Auth ({
    token:uid2(32),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash
    })

  // Check if the user has not already been registered
  Auth.findOne({email : req.body.email}).then(data =>{
    if (data === null) {
       newUser.save();
      res.json({result: true})
    }  else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
    
  })
}); 
  

router.post('/signin',(req,res)=> {
  if (!checkBody(req.body, ['email','password'])){
    res.json({ result: false, error:'Missing or empty fields'})
    return;
  }
  Auth.findOne({email: req.body.email}).then(data => {
    //console.log(data.password)
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token:data.token});
    } else {
      res.json ({result: false, error: 'User not found'})
    }
  })
})
  
router.post('/socialsignin', async(req, res)=> {
  const { firstName, lastName, email } = req.body
  const found = await Auth.findOne({email})
  if (!found) {
    const newUser = await new Auth({token: uid2(32), firstName, lastName, email})
    await newUser.save()
    console.log(newUser)
    res.json({
      result: true, 
      token: newUser.token,
      message: 'User created in the db'
    })
  } else {
    console.log(found)
    res.json({
      result: true, 
      token: found.token,
      message: 'User found in the db'
    })
  }
})



module.exports = router;
