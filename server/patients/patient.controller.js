// const { genSaltSync,hashSync} = require('bcrypt')

// import Patient Email from patient service
const getPatientEmail = require('./patient.service')

const {signIn} = require('jsonwebtoken');
const { compareSync } = require('bcryptjs');

// check for email and compare password
exports.login = (req,res)=>{
    const body = req.body;
    getPatientEmail(body.email,(err,results)=>{
        if(err){
            console.log(err)
        }
        if(!results){
            return res.json({
                success:0,
                data:"Invalid email or password"
            })
        }
    const result = compareSync(body.password,result.password)
        if(result){
            results.password = undefined;

    const jsontoken = signIn({result:results},'digisecrettoken',{
                expiresIn:'1h'
    })
            return res.json({
            success:1,
            message:"Patient login successfully",
            token:jsontoken
    });
}       else{
            return res.json({
            success:0,
            data:"Invalid email or password"
    })
}
})
}