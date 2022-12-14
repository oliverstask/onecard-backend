const express = require('express');
const router = express.Router();
require ('../models/connections');
const Transaction = require('../models/transactions')

router.post('/', (req, res)=> {
    res.json({result: true})
})

router.get('/:userid', async(req, res)=> {
    res.json({result: true})
})

router.get('/:userid/:qr', async(req, res)=> {
    res.json({result: true})
})

router.delete('/', async(req, res)=> {
    res.json({result: true})
})

module.exports = router




