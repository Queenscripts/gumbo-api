const AuthService = require('./auth-service')
const { requireAuth } = require('../middleware/jwt-auth')

const express = require('express')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .route('/login')
  .post(jsonBodyParser, (req, res, next) => {
    const { email, password } = req.body
    const loginUser = { email, password }

    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    try {
      AuthService.getUserWithUserName(
        req.app.get('db'),
        loginUser.email
      )
      .then(dbUser => {
        if (!dbUser)
        return res.status(400).json({
          error: 'Incorrect email or password',
        })
        console.log('USER', dbUser.email, dbUser.password)
        AuthService.comparePasswords(
          loginUser.password,
          dbUser.password
        )
        .then(compareMatch=>{
          if (!compareMatch)
          return res.status(400).json({
            error: 'Incorrect username or password',
          })
  
        const sub = dbUser.email
        const payload = {
          user_id: dbUser.id
        }
        console.log('sub, payload', sub, payload)
        res.send({
          authToken: AuthService.createJwt(sub, payload),
        })
        })
      })     
    } catch (error) {
      next(error)
    }
  })



module.exports = authRouter