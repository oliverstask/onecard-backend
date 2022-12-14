const express = require('express');
const router = express.Router();
require ('../models/connections');
const Qr = require('../models/qrs')

router.post('/', async(req, res)=> {
    try {
        res.json({result: true})

    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})

router.get('/:qrId', async(req, res)=> {
    try {
        res.json({result: true})

    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})

router.delete('/', async(req, res)=> {
    try {
        res.json({result: true})

    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})

module.exports = router