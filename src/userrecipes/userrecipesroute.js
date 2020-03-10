'use strict';
const express = require('express');
const userRecipesService = require('./userrecipesservice');
const fileUpload = require('express-fileupload');

const {
  requireAuth
} = require('../middleware/jwt-auth')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


  //First, get request to fetch recipe data  
recipesRouter
  .route('/')
  .all(requireAuth)
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
  .post(jsonBodyParser, (req, res, next) => {
    const db = req.app.get('db');
  let thumbnail = req.files.file;
  thumbnail.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    const {thumbnail, title, ingredients, recipeurl } = req.body;
    let newRecipe = {thumbnail, recipeurl, ingredients, title}

    userRecipesService.insertRecipe(db, newRecipe)
    .then(recipes=>{
      res.status(201).json({file: `public/${req.body.filename}.jpg`}, recipes)
    })
    .catch(next)
  });


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
