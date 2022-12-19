const express = require('express');
const router = express.Router();
require ('../models/connections');
const Setting = require('../models/settings')
const User = require('../models/users')

//Gather all the infos of the user sending his id
router.get('/:userId', async(req, res)=> {
    try {
        const { userId } = req.params
        const foundUser = await User.findById(userId).populate('userSettings')
        const { firstName, lastName, email, userSettings } = foundUser
        res.json({
            result: true,
            user: {firstName, lastName, email, userSettings}
        })
    } catch(error) {
        console.log(error)
        res.json({result: false, message: 'Error'})
    }
})

// Modify required infos of the profile
router.put('/required', async(req, res)=> {
    try {
        const { userId, valueToUpdate, newValue } = req.body
        if (!userId || !valueToUpdate || !newValue){
            res.json({result: false, message: 'Missing values'})
            return
        }
        await User.findByIdAndUpdate(userId, {[valueToUpdate]: newValue})
        res.json({
            result: true,
            message: 'User info updated successfully'
        })
    } catch(error) {
        console.log(error)
        res.json({result: false, message: 'Error'})
    }
})

//Modifiy settings infos 
router.put('/userSettings', async(req, res)=> {
    try {
        const { userId, valueToUpdate, newValue } = req.body
        if (!userId || !valueToUpdate || !newValue){
            res.json({result: false, message: 'Missing values'})
            return
        }
        const user = await User.findById(userId)
        const settingsId = user.userSettings
        if(newValue){
            await Setting.findByIdAndUpdate(settingsId, {[valueToUpdate]: newValue})
        } else {
            await Setting.findByIdAndUpdate(settingsId, {[valueToUpdate]: null})
        }
        res.json({
            result: true,
            message: 'User info updated successfully'
        })
   
    } catch(error) {
        console.log(error)
        res.json({result: false, message: 'Error'})
    }
})


//Add a new custom info 
router.post('/customs', async(req, res)=> {
    try {
        const { userId, name, url, icon, color } = req.body
        const user = await User.findById(userId)
        const settingsId = user.userSettings
        const settingsDocument = await Setting.findById(settingsId)
        const userCustoms = settingsDocument.customs
        const newCustomArray = [...userCustoms, {name, url, icon, color}]
        await Setting.findByIdAndUpdate(settingsId, {customs : newCustomArray})
        res.json({result: true})
    } catch(error) {
        console.log(error)
        res.json({result: false, message: 'Error'})
    }
})

//Remove a custom info
router.delete('/customs', async(req, res)=> {
    try {
        const { userId, url } = req.body
        const user = await User.findById(userId)
        const settingsId = user.userSettings
        const settingsDocument = await Setting.findById(settingsId)
        const userCustoms = settingsDocument.customs
        if (userId && url){
            const newCustomArray = userCustoms.filter((e)=> e.url !== url)
            await Setting.findByIdAndUpdate(settingsId, {customs : newCustomArray})
            res.json({result: true})
        } else {
            res.json({result: false, message: 'Missing information'})
        }
    } catch(error) {
        console.log(error)
        res.json({result: false, message: 'Error'})
    }
})


module.exports = router


