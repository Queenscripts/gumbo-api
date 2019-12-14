const xss = require('xss')

const RecipesService = {
  
  getAllRecipes(db) {
    return db.select('*').from('recipes')
  },
  getById(db, id) {
    return db.from('recipes').select('*').where('id', id).first()
  },
  insertRecipe(db, newRecipe) {
    return db
      .insert(newRecipe)
      .into('recipes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteRecipe(db, id) {
    return db('recipes')
      .where({ id })
      .delete()
  },
  updateRecipe(db, id, newRecipeList) {
    return db('recipes')
      .where({ id })
      .update(newRecipeList)
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}




module.exports = RecipesService
