process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'

require('dotenv').config()

process.env.TEST_DB_URL = process.env.TEST_DB_URL
  || 'postgresql://gumbo@localhost/gumbo'

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest