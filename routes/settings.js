const express = require('express');
const router = express.Router();
require ('../models/connections');
const Setting = require('../models/settings')

router.get('/:id', async(req, res)=> {
    res.json({result: true})
})

router.put('/', async(req, res)=> {
    res.json({result: true})
})

router.put('/customs', async(req, res)=> {
    res.json({result: true})
})


module.exports = router


