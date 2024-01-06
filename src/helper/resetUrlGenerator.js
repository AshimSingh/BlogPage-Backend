const User = require('../models/user')
const jwt = require('jsonwebtoken')
const resetUrlGenerator=async(req,email)=>{
    const user = await User.findOne({email}).lean()
    const token =await jwt.sign({_id:user._id}, process.env.SECRET_KEY,{ expiresIn: 60 *10})
    var resetUrl = `${req.connection & req.connection.encrypted?"https":"http"}://${req.header('host')}/api/users/resetpassword?token=${token}`
    console.log(resetUrl)
    return resetUrl
}
module.exports = resetUrlGenerator