'use strict';
const express = require('express');
const userRecipesService = require('./userrecipesservice');
const path = require('path');

const {
  requireAuth
} = require('../middleware/jwt-auth')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

  //First, get request to fetch recipe data  
recipesRouter
  .route('/')
//   .all(requireAuth)
  .get((req, res, next) => {
      const db = req.app.get('db');
      userRecipesService.getAlluserrecipes(db)
      .then(recipes => {
        res.status(200).json(recipes).send(req.file)
      })
      .catch(
        next
      )
  })
  .post((req, res, next) => {
    console.log('DIRECT',__dirname )
    let img = req.files.recipeimage
    let thumbnail = path.join((__dirname + '/public/gumbo/public') + img.name);
        const db = req.app.get('db');
        img.mv(thumbnail, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        })
        const {title, ingredients, recipeurl}  = req.body;
        let newRecipe = {recipeurl, ingredients, title, thumbnail}
        userRecipesService.insertRecipe(db, newRecipe)  
        .then( recipes=>{
          res.json(recipes).status(201)
        })
        .catch(next)
      
  })


recipesRouter
.route("/:id")
.all(requireAuth)
.put(jsonBodyParser, (req, res, next)=>{
  const db = req.app.get('db');
  const {id} = req.params; 
  const {thumbnail, title, ingredients, recipeurl} = req.body;
  let newRecipe = {ingredients, title}
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
