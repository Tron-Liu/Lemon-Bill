'use strict'
var mysql = require('mysql'); //导入mysql Module  
  
var pool = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: '123456',  
    database: 'bill' ,
    charset:"UTF8",
    port:3306 
});  
  
//查询sql语句  
function query(strSQL, param, callback) {  
    pool.getConnection(function(err, connection) {
        try {
            connection.query(strSQL, param, function(error, results, fields) {
                callback(results, fields); 
                connection.release(); 
            });  
        } catch (error) {
            console.error(error);
        }
    });  
}  
  
exports.query = query;  