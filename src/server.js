const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')
const HOST = 'localhost';


const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

