const xss = require('xss')

const UsersService = {
  get(db) {
    return db.select('*').from('users')
  }
}

module.exports = UsersService
