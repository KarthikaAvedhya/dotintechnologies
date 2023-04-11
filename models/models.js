"use strict"

const {promisify} = require('util');
const  mysql      = require('mysql');
/*-- MySQL Connection --*/
let  pool     = mysql.createPool({
            host     : 'localhost',
            user     : 'root',
            password : "",
            database : 'elearning'
});

/* Promisify Mysql Connection */
pool.query   = promisify(pool.query);

(async() =>{
  try{
    await pool.query('SELECT NOW() AS "theTime"');
     console.log("Mysql Connected");
}catch(err){
    console.log(err);
  }
})();
module.exports.Pool     = pool;