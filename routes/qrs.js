const express = require('express');
const router = express.Router();
require ('../models/connections');
const Qr = require('../models/qrs')

router.post('/', async(req, res)=> {
    res.json({result: true})
})

router.get('/:id', async(req, res)=> {
    res.json({result: true})
})

router.delete('/', async(req, res)=> {
    res.json({result: true})
})

module.exports = router