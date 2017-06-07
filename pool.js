const mysql=require('mysql');

module.exports=mysql.createPool({
    user:'root',
    password:'',
    database:'bitspaceman',
    connectionLimit:5
});