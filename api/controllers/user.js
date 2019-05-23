const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUserController = (req, res, next) => {
  User.find()
    .then(data => {
      res.json({
        message: "All Users",
        users: data
      })
    })
}

const registerController = (req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if(err){
        res.json({
          message: "Error Occured",
          error: err
        })
      } else{
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash
        })

        user.save()
          .then(result => {
            res.status(201).json({
              message: "Registered Successfully",
              info: result
            })
          })
          .catch(err => {
            res.json({
              message: "Error found",
              error: err
            })
          })
      }
    })  
  })
}

const loginController = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      if(user){
        bcrypt.compare(password, user.password, (err, result) => {
          //If err
          if(err){
            res.json({
              message: "Error occured"
            })
          }

          //check pass
          if (result){
            let newToken = jwt.sign({email: user.email, _id: user._id}, 'SECRET', {expiresIn: '2h'})
            res.json({
              message: "Login Successfully.",
              token: newToken
            })
          } else{
            res.json({
              message: "Login Failed: Password in not correct!"
            })
          }
        })
      } else{
        res.json({
          message: "User Not found!",
        })
      }
    })
    .catch(err => {
      res.json({
        message: "Error occured",
        error: err
      })
    })
}

module.exports = {getAllUserController, registerController, loginController}