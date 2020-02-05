const Users = require('../users/users-model.js');
const db = require('../database/dbConfig.js');

describe("Users Model", function() {

    describe('test environment', function() {
        it('should use testing environment', function(){
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    
    describe('add()', function(){

        beforeEach(async () => {
            await db('users').truncate();
        })

        it('Adds a new User', async function(){
            // call to add a new User
            await Users.add({firstName: "test1", lastName:"test1", email: "test1@test.com", password:"Test"})
            const users = await db('users');
            expect(users).toHaveLength(1);
        })
    })

    describe('remove() ', function() {

        beforeEach(async () => {
            await db('users').truncate();
        })

        it('Removes a user from the DB', async function(){
            
            await Users.add({firstName: "test2", lastName:"test2", email: "test1@test.com", password:"Test"})
            await Users.add({firstName: "test2", lastName:"test2", email: "test2@test.com", password:"Test2"})
            await Users.remove(2);

            const users = await db('users');
            expect(users).toHaveLength(1);
            
        })
    })


})