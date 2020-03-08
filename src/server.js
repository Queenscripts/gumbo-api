const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

exports.up = function (knex) {
  return knex.schema
  .hasTable('userrecipes')
  .then(function(exists){
    if(!exists){
      return knex
  .createTable('userrecipes', function (table) {
  table.increments();
  table.string('thumbnail');
  table.string('title');
  table.string('ingredients');
    table.string('recipeurl');
  })
 })
};

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

