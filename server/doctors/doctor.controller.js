// const { genSaltSync,hashSync} = require('bcrypt')

const getDoctorEmail = require('./doctor.service')

const {signIn} = require('jsonwebtoken');
const { compareSync } = require('bcryptjs');

exports.login = (req,res)=>{
    const body = req.body;
    getDoctorEmail(body.email,(err,results)=>{
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
                message:"Doctor login successfully",
                token:jsontoken
            });
        } else{
            return res.json({
                success:0,
                data:"Invalid email or password"
            })
        }
    })
}