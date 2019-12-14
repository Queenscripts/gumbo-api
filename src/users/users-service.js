const bcrypt = require('bcryptjs')
const xss = require('xss')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

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
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain one upper case, lower case, number and special character'
    }
    return null
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    }
  },
}

module.exports = UsersService
