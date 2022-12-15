const express = require('express');
const router = express.Router();
require ('../models/connections');
const Qr = require('../models/qrs')
const User = require('../models/users')
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
     res.json({result: false, message: 'Error'})
    }
})


//Show the list of all the qrs
router.get('/user/:userId', async(req, res)=> {
    try {
        const { userId } = req.params
        const qrList = await Qr.find({userId})
        res.json({result: true, qrList})

    } catch(error) {
     console.log(error)
     res.json({result: false, message: 'Error'})
    }
})

//Get one qr 
router.get('/qr/:qrId', async(req,res)=> {
    try {
        const { qrId } = req.params
        const qr = await Qr.findById(qrId)
        const infosArr = qr.infos.split(' ')
        const userInfos = await User.findById(qr.userId).populate('userSettings')
        const {firstName, lastName, email } = userInfos
        const settings = userInfos.userSettings
        const responseArr = [{firstName}, {lastName}, {email}]
        console.log(settings)
        infosArr.forEach((e)=> {
            const data = settings[e]
            responseArr.push({[e]: data})
        })
        
        res.json({result: true, responseArr})
    } catch(error) {
     console.log(error)
     res.json({result: false, message: 'Error'})
    }
})

//Remove a qr from the list
router.delete('/', async(req, res)=> {
    try {
        const { qrId } = req.body
        await Qr.findByIdAndRemove(qrId)
        res.json({result: true, message: 'Qr deleted successfully'})
    } catch(error) {
     console.log(error)
     res.json({result: false, message: 'Error'})
    }
})

//Switch a qr in fav/notfav
router.put('/fav', async(req, res)=> {
    try {
        const { qrId, userId } = req.body
        const userQrs = await Qr.find({userId})
        if (userQrs.some(e=> e._id == qrId)){
            await Qr.updateMany({userId}, { $set:{isFav: false}})
            await Qr.findByIdAndUpdate(qrId, {isFav: true})
            console.log('Fav qr changed')
        } else {
            console.log('You cannot modify this qr')
        }
        res.json({result: true, message: 'Switched qr to fav'})

    } catch(error) {
     console.log(error)
     res.json({result: false, message: 'Error'})
    }
})


module.exports = router