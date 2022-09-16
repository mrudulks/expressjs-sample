const { development } = require('./knexfile');
const database = require('knex')(development)
module.exports = {
    database
}