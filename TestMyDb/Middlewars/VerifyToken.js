
const ERROR = require("../UTILS/fnError");
const httpText = require("../UTILS/httpText");
const JWT = require("jsonwebtoken");

const VerifyToken = async(req , res , next)=>{

    const authToken = await req.headers["Authorization"] || req.headers["authorization"];

    if(!authToken){
       return next(ERROR(401 ,httpText.ERROR , "Authorization is required" ))
    }

    const Token = await  authToken.split(' ')[1];
    try {
        const decodeToken =   JWT.verify(Token , process.env.SUCRET_KEY);
        
        req.role = decodeToken.role; 
        next();
    }catch(err) {
        return next(ERROR(401 ,httpText.ERROR , "Invalid Token" ))
   
    }

    
    
}

module.exports=VerifyToken;

