const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')

knex.schema.createTable('userrecipes', function (table) {
  table.increments();
  table.string('thumbnail');
  table.string('title');
  table.string('ingredients');
    table.string('recipeurl');

})
const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

