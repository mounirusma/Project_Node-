const { body , validationResult } = require("express-validator");

const validation = ()=>{
    return [
        body('name').notEmpty(),
        body('email').notEmpty(),
        body('password').notEmpty().isLength({min:8})

    ]
}

module.exports = validation;