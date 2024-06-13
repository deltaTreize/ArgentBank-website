const userService = require('../services/userService');
const User = require("../database/models/userModel");

module.exports.createUser = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.createUser(req.body)
    response.status = 200
    response.message = 'User successfully created'
    response.body = responseFromService
  } catch (error) {
    console.error('Something went wrong in userController.js', error)
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}


module.exports.loginUser = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.loginUser(req.body)
    response.status = 200
    response.message = 'User successfully logged in'
    response.body = responseFromService
  } catch (error) {
    console.error('Error in loginUser (userController.js)')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.getUserProfile(req)
    response.status = 200
    response.message = 'Successfully got user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.updateUserProfile = async (req, res) => {
  let response = {}

  try {
    const responseFromService = await userService.updateUserProfile(req)
    response.status = 200
    response.message = 'Successfully updated user profile data'
    response.body = responseFromService
  } catch (error) {
    console.log('Error in updateUserProfile - userController.js')
    response.status = 400
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

// module.exports.updateDescription = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await userService.updateDescription(req)
//     response.status = 200
//     response.message = 'Successfully updated description of operation'
//     response.body = responseFromService
//   } catch (error) {
//     console.log('Error in updateUserProfile - userController.js')
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }

// module.exports.updateCategory = async (req, res) => {
//   let response = {}

//   try {
//     const responseFromService = await userService.updateCategory(req)
//     response.status = 200
//     response.message = 'Successfully updated category of operation'
//     response.body = responseFromService
//   } catch (error) {
//     console.log('Error in updateUserProfile - userController.js')
//     response.status = 400
//     response.message = error.message
//   }

//   return res.status(response.status).send(response)
// }