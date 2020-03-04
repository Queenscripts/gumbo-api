# GUMBO API

Search the Gumbo API databse for recipes, as well as recipes users have submitted via the Gumbo app. 

+ [Live App](https://gumbo.now.sh/)
+ [Client R
epo](https://github.com/QueenShabazz/gumbo)
+ [Server Repo](https://github.com/QueenShabazz/gumbo-api/)

## Set up

```
git clone https://github.com/QueenShabazz/gumbo-api/
cd gumbo-api
npm install
touch.env
Setup your credential in your enviroment file
create your db: create db -U <username> gumbo
create your testdb: create db -U <username> gumbo-test
```
Edit the contents of the package.json to use NEW-PROJECT-NAME instead of "name": "gumbo",

`This api requires a valid Youtube API key`

## Routes

```
/api/auth
/api/users
/api/recipes
```

### Endpoint Response Examples:

/api/recipes
```
[
    {
    "id": 16,
    "thumbnail": "https://bigoven-res.cloudinary.com/image/upload/w_300,c_fill,h_250/omelet-2250003.jpg",
    "title": "Eggplant Omelet with Coriander and Caraway",
    "ingredients": "caraway seed, coriander, eggplant, eggs, garlic, lemon, olive oil, onions, black pepper, salt",
    "recipeurl": "http://www.epicurious.com/recipes/food/views/Eggplant-Omelet-with-Coriander-and-Caraway-306"
    }
]
```

/api/recipes/:id
```
[
    {
    id: 17,
    thumbnail: "http://img.recipepuppy.com/694321.jpg",
    title: "Blue Ribbon Meatloaf",
    ingredients: "onions",
    recipeurl: "http://www.eatingwell.com/recipes/meatloaf.html"
    }
]
```

/api/users
```
[
    {
    "id": 2,
    "email": "code@queenscript.com",
    "password": "$2a$12$aqsYmjbO1.RPMhOVvVVbpO5vcJMss3I631fGstqRalnpaAVlHdUni",
    "date_created": "2020-01-30T01:13:51.110Z",
    "date_modified": null
    }
]
```


## Scripts

Start the application:
```
 npm start
```
---
Start nodemon for the application:
```
 npm run dev
```
Run the test:
```
npm test
```
---
Run the migrations up:
```
npm run migrate
```
Run the migrations down
```
npm run migrate -- 0
```
---
Run the test migrations up:
```
MIGRATION_DB_NAME=gumbo npm run migrate
```
Run the test migrations down
```
MIGRATION_DB_NAME=gumbo-test npm run migrate -- 0
```
---
Run the production migrations up:
```
npm run migrate-production
```
Run the migrate-production down
```
npm run migrate-production -- 0
```

## Seeds

Add:


```
// from the terminal
psql -U <username> -d gumbo -f ./path-to-gumbo-api/seeds/seed.recipe.sql

// from within the db
\i ./path-to-gumbo-api/seeds/seed.recipe.sql
```
---

`Test User:`
+ username: admin
+ password: pass


## Built With

+ [Node.js](https://nodejs.org/en/) - engine
+ [Express](https://expressjs.com/) - framework
+ [PostgreSQL](https://www.postgresql.org/) - database

## Libraries (Node Modules)

+ Dependencies
  + [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  + [cors](https://www.npmjs.com/package/cors)
  + [dotenv](https://www.npmjs.com/package/dotenv)
  + [express](https://www.npmjs.com/package/express)
  + [helmet](https://www.npmjs.com/package/helmet)
  + [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  + [knex](https://www.npmjs.com/package/knex)
  + [morgan](https://www.npmjs.com/package/morgan)
  + [node-fetch](https://www.npmjs.com/package/node-fetch)
  + [path](https://www.npmjs.com/package/path)
  + [pg](https://www.npmjs.com/package/pg)
  + [pg-escape](https://www.npmjs.com/package/pg-escape)
  + [utf8](https://www.npmjs.com/package/utf8)
  + [util](https://www.npmjs.com/package/util)
  + [xss](https://www.npmjs.com/package/xss)
---
+ Dev-Dependencies
  + [chai](https://www.npmjs.com/package/chai)
  + [mocha](https://www.npmjs.com/package/mocha)
  + [nodemon](https://www.npmjs.com/package/nodemon)
  + [postgrator-cli](https://www.npmjs.com/package/postgrator-cli)
  + [supertest](https://www.npmjs.com/package/supertest)

