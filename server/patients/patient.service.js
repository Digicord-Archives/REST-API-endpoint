const pool = require('../utils/database')


const getPatientEmail= (email,callback)=>{
    const query = pool.execute(`SELECT * FROM patient where email=?`)
    query.query(query,[email],((err,res)=>{
        if(err){
            callback(err)
        }
        return callback(null,result[0])
    }))
}