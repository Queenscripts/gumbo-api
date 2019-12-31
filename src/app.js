'use strict';
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
let pg = require('pg')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const usersRouter = require('./users/users-router')
const recipesRouter = require('./recipes/recipes-router')
const recipesApi = require('./recipes-api/recipes-api-router')

const winston = require('winston');


app.use(morgan((NODE_ENV === 'production') 
? 'tiny' 
: 'common', {
  skip: () => NODE_ENV === 'test',
}))

app.use(cors())
app.use(helmet())
app.use(express.json())

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.use('/api/users', usersRouter)
app.use('/api/recipes', recipesRouter)
app.use('/recipes-api', recipesApi)
app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); 
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers","Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
  next();
});

app.get('/', function(req, res, next) {
  console.log('hello')
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});


app.get('users', (req, res)=>{
    res.json()
  })

module.exports = app
