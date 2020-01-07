'use strict';
const path = require('path');
const express = require('express');
const RecipesService = require('./recipes-service');

const {
  requireAuth
} = require('../middleware/jwt-auth')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

  //First, get request to fetch recipe data  
recipesRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
      const db = req.app.get('db');
      RecipesService.getAllRecipes(db)
      .then(recipes => {
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
      res.status(201).json(recipes)
    })
    .catch(next)
  });


recipesRouter
.route("/:id")
.all(requireAuth)
.put(jsonBodyParser, (req, res, next)=>{
  const db = req.app.get('db');
  const {id} = req.params; 
  const {ingredients, title} = req.body;
  if (!title){
     res
      .status(400)
      .send ('title does not exist');
  }
  if (!ingredients){
     res
      .status(400)
      .send ('ingredients does not exist');
  }

  let newRecipe = {ingredients, title}
  RecipesService.updateRecipe(db, id, newRecipe)
    .then(recipes=>{
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
    if(recipes == undefined){
      res.status(404).json({error: "NOT FOUND"})
    }
    res.status(200).json(recipes)
  })
  .catch(next)
})

module.exports = recipesRouter