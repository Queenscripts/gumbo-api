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
  .route('/:users_id')
  .all(async (req, res, next)=> {
    try {
      const users= await UsersService.findById(req.app.get('db'), req.params.users_id);
      if(!users){
        return next(
          {status: 404,
          message: 'User doesn\'t exist'});
      }
      res.users= users;
      next();
    } catch (err) {
      next(err);
    }
  })
  .get(jsonBodyParser, (req, res, next) => {
   const db = req.app.get('db');
   try{
     const users = await UsersService.UsersRouter (db)
     res.json(users)
   } catch (err) {
     next(err)
   }
  })
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db');
    const { email } = req.body;
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
    //sanitize new recipe? 
    // const newRecipe = sanitizeFields({name})
    res.send('All validation passed');
    try{
      const users = await UsersService.insert(db, newUser);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${users.id}`))
        .json(users);
    } catch (err){
      next (err);
    }
  });

  UsersRouter
.delete(async, (req, res, next) => {
  try{
    await UsersService.delete(req.app.get('db'), req.params.recipes_id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  } 
});


module.exports = UsersRouter