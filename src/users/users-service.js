const xss = require('xss')

const UsersService = {
  getById(db, id) {
    return db.select('*').from('users').where('id',id)
  },
  getAll(db) {
    return db.select('*').from('users')
  },
  put(db, id) {
    return db.select('*').from('users').where('id',id)
  },
  post(db, newUser) {
    return db('users')
    .insert({email: newUser.email, password: newUser.password})
    .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  delete(db, id) {
    return db('users').where({'id':id}).del()
  }
}

module.exports = UsersService
