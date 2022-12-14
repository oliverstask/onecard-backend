const express = require('express');
const router = express.Router();
require ('../models/connections');
const Transaction = require('../models/transactions')

router.post('/', (req, res)=> {
    try {
        res.json({result: true})
        
    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})

router.get('/:userId', async(req, res)=> {
    try {
        res.json({result: true})

    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})

router.get('/:userId/:qrId', async(req, res)=> {
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




