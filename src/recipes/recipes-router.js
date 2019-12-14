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

//goes to recipe puppy 
recipesRouter
  .route('/fetch')
  .get((req, rex, next)=>{

  })

  //First, get request to fetch recipe data  
recipesRouter
  .route('/')
 
  .get((req, res, next) => {
      const db = req.app.get('db');
      RecipesService.getAllRecipes(db)
      .then(recipes => {
        console.log('recipes', recipes)
        res.status(200).json(recipes)
      })
      .catch(
        next
      )
  })
 
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db');
    const {thumbnail, title, ingredients, recipeurl } = req.body;
    if (!recipeurl){
      return res
        .status(400)
        .send ('recipeurl does not exist');
    }
    if (!thumbnail){
      return res
        .status(400)
        .send ('thumbnail does not exist');
    }
    if (!title){
      return res
        .status(400)
        .send ('title does not exist');
    }
    if (!ingredients){
      return res
        .status(400)
        .send ('ingredients does not exist');
    }
    let newRecipe = {thumbnail, recipeurl, ingredients, title}

    RecipesService.insertRecipe(db, newRecipe)
    .then(recipes=>{
      console.log('recipes: ', recipes)
      res.status(201).json(recipes)
    })
    .catch(next)
  })
     
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
})

.delete( (req, res, next) => {
  try{
     RecipesService.delete(req.app.get('db'), req.params.recipes_id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  } 
});


recipesRouter
.route("/:id")
.put(jsonBodyParser, (req, res, next)=>{
  const db = req.app.get('db');
  const {id} = req.params; 
  const {thumbnail, recipeurl, ingredients, title} = req.body;
  if (!recipeurl){
    return res
      .status(400)
      .send ('recipeurl does not exist');
  }
  if (!thumbnail){
    return res
      .status(400)
      .send ('thumbnail does not exist');
  }
  if (!title){
    return res
      .status(400)
      .send ('title does not exist');
  }
  if (!ingredients){
    return res
      .status(400)
      .send ('ingredients does not exist');
  }

  let newRecipe = {thumbnail, recipeurl, ingredients, title}


  RecipesService.updateRecipe(db, id, newRecipe)
    .then(recipes=>{
      console.log('recipes:', recipes)
      if(recipes == undefined){
        res.status(404).json({error: "NOT FOUND"})
      }
      res.status(200).json(recipes)
    })
    .catch(next)
})
.delete((req, res, next)=>{
  const db = req.app.get('db');
  const {id} = req.params;
  RecipesService.deleteRecipe(db, id)
  .then( recipes=>{
    res.status(204).end()
  })
  .catch(next)
})
.get((req, res, next) => {
  const db = req.app.get('db');
  const {id} = req.params;
  RecipesService.getById(db, id)
  .then(recipes =>{
    console.log('recipes=', recipes)
    if(recipes == undefined){
      res.status(404).json({error: "NOT FOUND"})
    }
    res.status(200).json(recipes)
  })
  .catch(next)
})

module.exports = recipesRouter