const express = require('express');
const router = express.Router();
require ('../models/connections');
const Qr = require('../models/qrs')

//Generate a new qr
router.post('/newQr', async(req, res)=> {
    try {
        const { userId, infos, qrName } = req.body

        const newQr = await new Qr({
            userId,
            infos,
            qrName,
            numScans: 0,
            isFav: false
        }).save()
        console.log(newQr)
        res.json({result: true, message: 'New qr generated'})

    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})


//Show the list of all the qrs
router.get('/:userId', async(req, res)=> {
    try {

        const { userId } = req.params
        const qrList = await Qr.find({userId})
        console.log(qrList)
        res.json({result: true, qrList})

    } catch(error) {
     console.log(error)
     res.json({result: true, message: 'Error'})
    }
})


//Remove a qr from the list
router.delete('/', async(req, res)=> {
    try {
        const { qrId } = req.body
        const deletedQr = await Qr.findByIdAndRemove(qrId)
        res.json({result: true, message: 'Qr deleted successfully'})
    } catch(error) {
     console.log(error)
     res.json({result: false, message: 'Error'})
    }
})

//Switch a qr in fav/notfav
router.put('/', async(req, res)=> {
    try {
        const { qrId } = req.body
        await Qr.findByIdAndUpdate(qrId, {isFav: true})
        res.json({result: true, message: 'Switched qr to fav'})

    } catch(error) {
     console.log(error)
     res.json({result: false, message: 'Error'})
    }
})


module.exports = router