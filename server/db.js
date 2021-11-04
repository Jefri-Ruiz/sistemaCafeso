const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Rapido90",
    host:"localhost",
    database:"cafeso",
    port:"5432"
});

module.exports = pool;

