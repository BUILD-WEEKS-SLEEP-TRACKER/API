const Users = require('../users/users-model.js');
const db = require('../database/dbConfig.js');

describe("Users Model", function() {

    describe('test environment', function() {
        it('should use testing environment', function(){
            expect(process.env.DB_ENV).toBe('testing');
        })
    })


})