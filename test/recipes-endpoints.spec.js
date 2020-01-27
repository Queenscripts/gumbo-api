const knex = require('knex')
const app= require('../src/app')
const helpers = require('./test-helpers')

describe('Recipes Endpoints', function(){
    let db 
    
    before('make knex instance', ()=>{
        db= knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })


after('disconnect from db', ()=> db.destroy())
beforeEach('clear', ()=> helpers.clean(db))
afterEach('clear db', ()=> helpers.clean(db))


describe('GET /api/recipes', ()=>{
    context('Given no recipes', ()=>{
        it('responds with 200', ()=>{
            supertest(app)
            .get('/api/recipes/')
            .expect(200)
            // can add more .expects = empty array
        })
    })
    context('Given there are recipes', ()=>{
        beforeEach('insert recipes', ()=>
       {
           helpers.seedRecipes(
               db, 
               helpers.makeRecipesArray() 
           )
       })
       it('responds with status 200', ()=>{
           supertest(app)
           .get('/api/recipes')
           .expect(200)
       })
    })

})

describe('GET /api/recipes/:id', ()=>{
    context('Given this recipe exists', ()=>{
       beforeEach('insert recipes', ()=>
       {
           helpers.seedRecipes(
               db, 
               helpers.makeRecipesArray() 
           )
       })
       it('responds with status 200', ()=>{
           supertest(app)
           .get('/api/recipes/1')
           .expect(200)
       })
    })
    context('Given this recipe doesn\'t exist', ()=>{
        it('responds with 404', ()=>{
            supertest(app)
            .get('/api/recipes/43920')
            .expect(404)
            // can add more .expects = error not found 
        })
    })
})

describe('POST /api/recipes', ()=>{
    context('Create a valid recipe', ()=>{
        it('responds with 201', ()=>{
            supertest(app)
            .post('/api/recipes')
            .send({
                title:'Test',
                thumbnail: '',
                ingredients:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(201)
            // can add more .expects = error not found 
        })
    })
    context('No recipe thumbnail', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/recipes')
            .send({
                title:'Test',
                ingredients:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('No recipe title', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/recipes')
            .send({
                thumbnail:'test.jpg',
                ingredients:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('No recipe ingredients', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/recipes')
            .send({
                thumbnail:'test.jpg',
                title:'Test',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('No recipe url', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/recipes')
            .send({
                thumbnail:'test.jpg',
                title:'Test',
                ingredients:'testing, food',
                url: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
})

describe('PUT /api/recipes/:id', ()=>{
    context('RecipeID doesn\'t exist', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .put('/api/recipes/33333')
            .send({
                title:'Test',
                thumbnail: '',
                ingredients:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    
    context('Missing Title', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .put('/api/recipes/401')
            .send({
                thumbnail: '',
                ingredients:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('Missing ingredients', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .put('/api/recipes/401')
            .send({
                thumbnail: '',
                title:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('Ingredients changed', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .put('/api/recipes/401')
            .send({
                thumbnail: '',
                title:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('Title changed', ()=>{
        beforeEach('insert recipes', ()=>
        {
            helpers.seedRecipes(
                db, 
                helpers.makeRecipesArray() 
            )
        })
        it('responds with status 200', ()=>{
            supertest(app)
            .put('/api/recipes/1')
            .send({
                title:'yummy',
                thumbnail: 'test.jpg',
                ingredients:'testing, food',
                recipeurl: 'test.com'
            })
            .set('Accept', 'application/json')
            .expect(200)
        }) 
    })

})

describe('DELETE /api/recipes/:id', ()=>{
    context('ID exists', ()=>{
        beforeEach('insert recipes', ()=>
        {
            helpers.seedRecipes(
                db, 
                helpers.makeRecipesArray() 
            )
        })
        it('responds with 204', ()=>{
            supertest(app)
            .delete('/api/recipes/1')
            .expect(204)
        })
    })
    context('ID doesn\'t exist', ()=>{
        it('responds with 204', ()=>{
            supertest(app)
            .delete('/api/recipes/99936')
            .expect(204)
        })
    })
})

}) //closes recipe endpoints test (line 5)