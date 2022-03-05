const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('./db').promise();


exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [req.body.email]
          );
        if (row.length === 0) {
            return res.status(422).json({
                message: "invalid emai",
            });
        }
        const pwdCheck = await bcrypt.compare(req.body.password, row[0].password);
        if(!pwdCheck){
            return res.status(422).json({
                message: "incorrect password",
            });
        }
        const jwtToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
        return res.json({
            token:jwtToken
        });

    }
    catch(err){
        console.log("err in login :: ",err);
        next(err);
    }
}