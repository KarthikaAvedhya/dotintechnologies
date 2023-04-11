const { createPool } = require("mysql");
const { Pool } = require('../models/models');

    
class userService{

    async checkCount(user_id){
        try 
        {
            let data=await Pool.query('SELECT * FROM teacher_course WHERE teacher_id=?  AND status != 0',[user_id]);
            console.log("dataaa",data)
            return data;
        }
        catch(err)
        {
            throw err;
        }
    }

    async studentActive(user_id){
        try 
        {
            let data=await Pool.query('SELECT * FROM student WHERE student_id=?  AND active_status="Inprogress"',[user_id]);
            console.log("dataaa",data)
            return data;
        }
        catch(err)
        {
            throw err;
        }
    }
}

module.exports = new userService();