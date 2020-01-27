const knex = require('knex')
const app= require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function(){
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

describe('GET /api/users', ()=>{
    context('Given no users', ()=>{
        it('responds with 200', ()=>{
            supertest(app)
            .get('/api/users/')
            .expect(200)
            // can add more .expects = empty array
        })
    })
    context('Given there are users', ()=>{
        beforeEach('insert users', ()=>
       {
           helpers.seedUsers(
               db, 
               helpers.makeUsersArray() 
           )
       })
       it('responds with status 200', ()=>{
           supertest(app)
           .get('/api/users')
           .expect(200)
           .end( function(err,res){
               if(err) return done(err);
               console.log('RES', res.body)
               expect(res.body).to.be.an('array')
           })
       }) 
    })

})

describe('GET /api/users/:id', ()=>{
    context('Given this user exists', ()=>{
        beforeEach('insert users', ()=>
       {
           helpers.seedUsers(
               db, 
               helpers.makeUsersArray() 
           )
       })
       it('responds with status 200', ()=>{
           supertest(app)
           .get('/api/users/1')
           .expect(200)
       })
    })
    context('Given this user doesn\'t exist', ()=>{
        it('responds with 404', ()=>{
            supertest(app)
            .get('/api/users/43920')
            .expect(404)
            // can add more .expects = error not found 
        })
    })
})

describe('POST /api/users', ()=>{
    context('Create a valid user', ()=>{
        it('responds with 201', ()=>{
            supertest(app)
            .post('/api/users')
            .send({
                email:'Test',
                password: '',
            })
            .set('Accept', 'application/json')
            .expect(201)
            // can add more .expects = error not found 
        })
    })
    context('No user thumbnail', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/users')
            .send({
                email:'Test',
                password: '',
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('No user title', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/users')
            .send({
                email:'Test',
                password: '',
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('No user ingredients', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/users')
            .send({
                email:'',
                password: 'Test',
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    context('No user password', ()=>{
        it('responds with 400', ()=>{
            supertest(app)
            .post('/api/users')
            .send({
                email:'Test',
                password: '',
            })
            .set('Accept', 'application/json')
            .expect(400)
            // can add more .expects = error not found 
        })
    })
    })
describe('DELETE /api/users/:id', ()=>{
    context('ID exists', ()=>{
        beforeEach('insert users', ()=>
        {
            helpers.seedUsers(
                db, 
                helpers.makeUsersArray() 
            )
        })
        it('responds with 204', ()=>{
            supertest(app)
            .delete('/api/users/1')
            .expect(204)
        })
    })
    context('ID doesn\'t exist', ()=>{
        it('responds with 204', ()=>{
            supertest(app)
            .delete('/api/users/99936')
            .expect(204)
        })
    })
})

})