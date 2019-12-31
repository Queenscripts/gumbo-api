const express = require('express'); 
const{ RecipeApi, RecipeApi2} = require('./recipes-api');
const apiRouter = express.Router();

apiRouter.get('/:ingredients', (req,res) => {
    let ingredients= req.params.ingredients;
    RecipeApi2.get(ingredients, 
        (err, ingredients)=>{
        if(err)
            return res.json(err);
            return res.json(ingredients);
    });
});

apiRouter.get('/:ingredients/:flavor', (req,res)=>{
    let ingredients= req.params.ingredients;
    let flavor= req.params.flavor;

    RecipeApi.getRecipe(ingredients, flavor, (err, ingredients, flavor)=>{
        if(err)
        return res.json(err);
        return res.json(ingredients,flavor);
    });
});

module.exports = apiRouter