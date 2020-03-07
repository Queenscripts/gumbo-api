const xss = require('xss')

const userRecipesService = {
  getAlluserrecipes(db) {
    return db.select('*').from('userrecipes')
  },
  getById(db, id) {
    return db.from('userrecipes').select('*').where('id', id).first()
  },
  insertRecipe(db, newRecipe) {
    return db
      .insert(newRecipe)
      .into('userrecipes')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteRecipe(db, id) {
    return db('userrecipes')
      .where({ id })
      .delete()
  },
  updateRecipe(db, id, newRecipeList) {
    return db('userrecipes')
      .where({ id })
      .update(newRecipeList)
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}




module.exports = userRecipesService
