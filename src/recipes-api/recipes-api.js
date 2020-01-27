class RecipeApi {
    static getRecipe(ingredients, flavor, callback){
       fetch(`http://www.recipepuppy.com/api/?i=${ingredients}%2C+&q=${flavor}/&minIngs=&maxIngs=&minRating=&minRates=20&onlyImages=1`
       ).then((res)=>{
           callback(res);
       }).catch((error)=>{
           //TODO figure out what to do when there's error
        });
    }
}

class RecipeApi2 {
    static get(ingredients, callback){
       fetch(`http://www.recipepuppy.com/api/?i=${ingredients}%2C+&q=&minIngs=&maxIngs=&minRating=&minRates=20&onlyImages=1`)
       .then((res)=>{
           callback(res);
       }).catch((error)=>{
           //TODO figure out what to do when there's error
        });
    }
}


module.exports= {RecipeApi,RecipeApi2}