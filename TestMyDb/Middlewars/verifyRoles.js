
const Err = require("../UTILS/fnError");
const httpText = require("../UTILS/httpText");


const verifyRoles = (...roles)=>{


    return (req , res , next)=>{

        const V_roles = roles.some((e)=> e ===req.role);

        if(V_roles) {
            return next()
        }else {
            next(Err(httpText.FAIL , null , "your not access to his role"));
        }

    }
} 

module.exports = verifyRoles;