const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "unach",
    host:"localhost",
    database:"cafeso",
    port:"5432"
});

module.exports = pool;

