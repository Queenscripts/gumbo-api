'use strict';
const jwt = require('jsonwebtoken');

function makeRecipesArray(){
    return [
        {
            id: 1, 
            title:'yummy test',
            thumbnail: 'test.jpg',
            ingredients:'testing, food',
            recipeurl: 'test.com'
        },
        {
            id: 2, 
            title:'yummy test2',
            thumbnail: 'test2.jpg',
            ingredients:'testing2, food2',
            recipeurl: 'test2.com'
        }
    ]
}

function makeUsersArray(){
    return [
        {
            id: 1, 
            email: 'test@test.com',
            password: 'test123'
        },
        {
            id: 2, 
            email: 'test2@test.com',
            password: 'test1234'
        }
    ]
}

function seedUsers(db, users) {
    return db('users').insert(users)
    .then(() => {
        db.raw('SELECT setval("users_id_seq", ?)', [users[users.length-1].id])
    });

}

function seedRecipes(db, recipes) {
    return db('recipes').insert(recipes)
    .then(() => {
        db.raw('SELECT setval("recipes_id_seq", ?)', [recipes[recipes.length-1].id])
    });

}

function clean(db){
    return db.raw(
        `TRUNCATE
            users, 
            recipes
            RESTART IDENTITY CASCADE
        `
    )
}

module.exports = {
    clean,
    makeRecipesArray,
    makeUsersArray,
    seedRecipes,
    seedUsers
}