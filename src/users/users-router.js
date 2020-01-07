'use strict';
const path = require('path');
const express = require('express');
const UsersService = require('./users-service')

const UsersRouter = express.Router();
const jsonBodyParser = express.json()

UsersRouter
  .route("/:id")
  .get((req, res, next) => {
    const db = req.app.get('db');
    const {id} = req.params;
    UsersService.getById(db,id)
   .then(users =>{ 
       if(users == undefined){
        res.status(404).json({error: "NOT FOUND"})
      }
       res.status(200).json(users)
     })
   .catch(next)
   })
  .delete((req, res, next) => {
    const db = req.app.get('db');
    const {id} = req.params;
    UsersService.delete(db, id)
    .then( users =>{
      res.status(204).end()
    })
    .catch(next)
  });
UsersRouter
  .route('/')
  .get( (req, res, next) => {
   const db = req.app.get('db');
   UsersService.getAll(db)
  .then(users =>{ 
      res.status(200).json(users)
      if(users == undefined){
        res.status(404).json({error: "NOT FOUND"})
      }
    })
  .catch(
    next
  )
  })
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    if (!email){
      return res
        .status(400)
        .send ('email is required');
    }
    if (!password) {
      return res
        .status(400)
        .send('Password required');
    }
    UsersService.hasUserWithEmail(
      db, 
      email
    )
      .then(hasUserWithEmail => {
        if (hasUserWithEmail)
          return res.status(400).json({error: 'Email taken'})
        return UsersService.hashPassword(password)
        .then(hashedPassword => {
          const newUser ={
            email, 
            password: hashedPassword,
            date_created: 'now()'
          }
           return UsersService.post(
             db, 
             newUser
           )
           .then (user =>{
             res.status(201)
             .json(UsersService.serializeUser(user))
           })
        })
      })
    .catch (next)
  });
  

module.exports = UsersRouter