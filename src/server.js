const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')

knex.schema.createTable('userrecipes', function (table) {
  table.increments();
  table.string('name');
})
Outputs:
create table `userrecipes` (`id` int unsigned not null auto_increment primary key, `thumbnail` varchar(255), `title` varchar(255),  `ingredients` varchar(255), `recipeurl` varchar(255) 
const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

