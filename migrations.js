var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'rest_api'
});

migration.init(connection, __dirname + '/migrations');