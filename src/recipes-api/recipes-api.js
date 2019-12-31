const request = require('request-promise');

class RecipeApi {
    static getRecipe(ingredients, flavor, callback){
       request({
           uri: `http://www.recipepuppy.com/api/?i=${ingredients}%2C+&q=${flavor}/&minIngs=&maxIngs=&minRating=&minRates=20&onlyImages=1`,
           json: true
       }).then((res)=>{
           callback(res);
       }).catch((error)=>{
           console.log({error: 'Could not reach Recipes API'});
        });
    }
}

class RecipeApi2 {
    static get(ingredients, callback){
       request({
           uri: `http://www.recipepuppy.com/api/?i=${ingredients}%2C+&q=&minIngs=&maxIngs=&minRating=&minRates=20&onlyImages=1`,
           json: true
       }).then((res)=>{
           callback(res);
       }).catch((error)=>{
           console.log({error: 'Could not reach Recipes API'});
        });
    }
}


module.exports= {RecipeApi,RecipeApi2}