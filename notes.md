To deploy to heroku:

add this to dbConfig file: 

const knex = require('knex');

const environment = process.env.DB_ENV || 'development';

const knexConfig = require('../knexfile.js')[environment];

module.exports = knex(knexConfig);

-deleted package-lock.json and node modules in visual studio and in the repo on github.

- ran this command: git rm -r --cached node_modules

/***************************************************************************

Testing setup: 

npm i -D jest supertest

npm i -D cross-env 

add: "test": "cross-env DB_ENV=testing jest --watch" to scripts in JSON.

add in JSON:

"jest": {
    "testEnvironment": "node"
  },

  
  dbConfig file looks like this: 

  const knex = require('knex');

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);