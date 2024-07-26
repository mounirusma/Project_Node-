
const mongose =require("mongoose");
const Validate = require("validator");
const Roles = require("../UTILS/Roles");

const sheme = mongose.Schema({
    name :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:[true , "Email is required unique"],
        validate:Validate.isEmail
    },
    password :{
        type:String,
        require:true
    },
    token :{
        type:String
    },
    role:{
        type:String,
        enim:[Roles.ADMIN , Roles.USER , Roles.MANAGER],
        default:Roles.USER
    }, 
    avatar:{
        type:String,
        default:"upload/profail.png"
    }
});

module.exports = mongose.model("user",sheme);
