const router = require('express').Router();
const {body} = require('express-validator');
const {login} = require('./login');

router.post('/login',[
    body('email',"invalid email")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"password must 4 characters ").notEmpty().trim().isLength({ min: 4 }),
],login);


module.exports = router;