'use strict';
const path = require('path');
const express = require('express');
const RecipesService = require('./recipes-service');
//sanitize fields?
// const {
//   requireAuth
// } = require('../middleware/basic-auth')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

  //First, get request to fetch recipe data  
recipesRouter
  .route('/:recipe_id')
  .all( (req, res, next)=>{
    try{
      const recipe =  RecipesService.findById(req.app.get('db'), req.params.recipe_id);
      if(!recipe){
        return next({status: 404, message: 'Recipe doesn\'t exist'});
      }
      res.recipe = recipe;
      next();
    } catch (err) {
      next(err);
    }
  })
  //jsonBodyParse or ? 
  .get(jsonBodyParser, (req, res, next) => {
      const db = req.app.get('db');
      try {
        const recipes =  
        //.list(db)???
        RecipesService.recipesRouter(db)
        res.json(recipes)
      } catch (err) {
        next(err);
      }
  })
  
  //Second, post request to add user with email 
  //add ?
  //jsonBodyParser vs jsonParser?
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db');
    const { recipe } = req.body;
    if (!recipe){
      return res
        .status(400)
        .send ('recipe does not exist');
    }
    // if (!password) {
    //   return res
    //     .status(400)
    //     .send('Password required');
    // }
    //sanitize new recipe? 
    // const newRecipe = sanitizeFields({name})
    res.send('All validation passed');
    try{
      const recipe =  RecipesService.insert(db, newRecipe);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${recipe.id}`))
        .json(recipe);
    } catch (err){
      next (err);
    }
  });

recipesRouter
.put(jsonBodyParser, (req, res, next) => {
  res
    .send('POST request received.');
  const {newRecipe} = req.body
  if (!username) {
    return res
      .status(400)
      .send('Username required');
  }
  
  if (!password) {
    return res
      .status(400)
      .send('Password required');
  }
});

recipesRouter
.delete( (req, res, next) => {
  try{
     RecipesService.delete(req.app.get('db'), req.params.recipes_id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  } 
});

module.exports = recipesRouter