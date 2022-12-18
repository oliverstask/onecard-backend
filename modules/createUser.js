const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const User = require('../models/users')
const Setting = require('../models/settings')

const createUser = async (firstName, lastName, email, socialLogin, password ) => {
    
    const newUserSettings = new Setting({
        phoneNumber: '',
        address: '',
        companyName: '',
        website: '',
        linkedin: '',
        whatsapp: '',
        tweeter: '',
        instagram: '',
        facebook: '',
        tiktok: '',
        resume: '',
        customs: []
      })
      await newUserSettings.save()

      if (!socialLogin){
        const hash = bcrypt.hashSync(password, 10)
          const newUser = new User({
              socialLogin,
              token:uid2(32),
              firstName,
              lastName,
              email,
              password: hash,
              photo: null,
              cover: null,
              userSettings: newUserSettings._id
            })
            await newUser.save()
            return newUser
        } else {
            const newUser = new User({
                socialLogin,
                token:uid2(32),
                firstName,
                lastName,
                email,
                password: null,
                photo: null,
                cover: null,
                userSettings: newUserSettings._id
              })
            await newUser.save()
            return newUser
        }
        
        
}

module.exports = createUser