'use strict';
const express = require('express');
const userRecipesService = require('./userrecipesservice');

const {
  requireAuth
} = require('../middleware/jwt-auth')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

  //First, get request to fetch recipe data  
recipesRouter
  .route('/')
  .get((req, res, next) => {
      const db = req.app.get('db');
      userRecipesService.getAlluserrecipes(db)
      .then(recipes => {
        res.status(200).json(recipes)
      })
      .catch(
        next
      )
  })
  .post(jsonBodyParser,(req, res, next) => {
      const db = req.app.get('db');
        const {thumbnail,title, ingredients, recipeurl}  = req.body;
        let newRecipe = {recipeurl, ingredients, title, thumbnail}
        userRecipesService.insertRecipe(db, newRecipe)  
        .then( recipes=>{
          res.status(201).json(recipes)
        })
        .catch(next)
      
  })


recipesRouter
.route("/:id")
.put(jsonBodyParser, (req, res, next)=>{
  const db = req.app.get('db');
  const {id} = req.params; 
  const {thumbnail, title, ingredients, recipeurl} = req.body;
  let newRecipe = {thumbnail, title, ingredients, recipeurl}
  userRecipesService.updateRecipe(db, id, newRecipe)
    .then(recipes=>{
      res.status(200).json(recipes)
    })
    .catch(next)
})
.delete((req, res, next)=>{
  
  const db = req.app.get('db');
  const {id} = req.params;
  userRecipesService.deleteRecipe(db, id)
  .then( recipes=>{
    res.status(204).end()
  })
  .catch(next)
})
.get((req, res, next) => {
  const db = req.app.get('db');
  const {id} = req.params;
  userRecipesService.getById(db, id)
  .then(recipes =>{
    if(recipes == undefined){
      res.status(404).json({error: "NOT FOUND"})
    }
    res.status(200).json(recipes)
  })
  .catch(next)
})

module.exports = recipesRouter
