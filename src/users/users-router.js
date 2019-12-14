'use strict';
const path = require('path');
const express = require('express');
const UsersService = require('./users-service')
// const {
//   requireAuth
// } = require('../middleware/basic-auth')

const UsersRouter = express.Router();
const jsonBodyParser = express.json()

UsersRouter
  .route("/:id")
  .get((req, res, next) => {
    const db = req.app.get('db');
    const {id} = req.params;
    UsersService.getById(db,id)
   .then(users =>{ 
       console.log('users= ', users)
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
      console.log('deleteusers: ', users)
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
      console.log('users= ', users)
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

    let newUser= {email, password}

    UsersService.post(db, newUser)
      .then(users=>{
        console.log('users: ', users)
        if(users == undefined){
          res.status(404).json({error: "NOT FOUND"})
        }
        res.status(201).json(users)
      })
      
    .catch (next)
  });
  




module.exports = UsersRouter