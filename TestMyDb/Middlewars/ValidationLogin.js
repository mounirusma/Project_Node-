const { body , validationResult } = require("express-validator");

const validationLogin = ()=>{
    return [
        body('email').notEmpty(),
        body('password').notEmpty().isLength({min:8})

    ]
}

module.exports = validationLogin;