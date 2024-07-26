const bcrybt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const GenToken = async (payload)=>{

    const option = {
expiresIn:'20s'
    }
const Token =await  JWT.sign(payload , process.env.SUCRET_KEY , option );
return Token;

}
module.exports = GenToken;