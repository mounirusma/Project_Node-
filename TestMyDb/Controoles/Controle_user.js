const mongose = require("mongoose")
const users = require("../Modules/users");
const {body , validationResult} = require("express-validator")
const apperWrrape = require("../Middlewars/apperWrrape");
const ERROR = require("../UTILS/fnError");
const httpText = require("../UTILS/httpText");
const bcrybt = require("bcryptjs");
const GenToken = require("../UTILS/GenToken");

const getAllusers = apperWrrape( async (req , res , next)=>{
    const limit = req.query.limit;
    const page = req.query.page;
    const skip = (page - 1)*limit;
     const Users =await users.find().limit(limit).skip(skip);
    !Users ? next(ERROR(httpText.FAIL ,null,"Users not found" ) ): res.json({status :httpText.SUCCESS , data:{Users}});
}
);

const getSingleUsers = apperWrrape( async (req , res , next)=>{
        const User = await users.findById(req.params.id);
        !User ? next(ERROR(httpText.FAIL ,null,"User not fond" ) ): res.json({status :httpText.SUCCESS , data:{User}});   
}
);


const Registry =apperWrrape( async (req , res , next )=>{

    const Error = validationResult(req);

    if(!Error.isEmpty()){
      return  next(ERROR(httpText.FAIL ,null,Error.array() ));
    }

    const {name , email , password , role } = req.body;
    

    const VerifyEmail = await users.find({email:email});


    if(VerifyEmail.length !== 0){
        return next(ERROR(httpText.ERROR ,null,"Email is already exist" ) );
    }

    const hashPassword = await bcrybt.hash(password , 10);
    const User =await new users({
        name ,
        email,
        password:hashPassword,
        role ,
        avatar:req.file.filename
    });

    const Token = await  GenToken({name:User.name , id:User._id , role:User.role});
    User.token = Token;

    await User.save();

    res.status(201).json({status:httpText.SUCCESS , data:{User}});

}
);

const UpdateUser = apperWrrape( async (req , res , next)=>{
     let id  = req.params.id
    const User = await  users.findByIdAndUpdate(id , {$set:req.body});
    if(!User){
     return next(ERROR(httpText.FAIL ,null,"User not fond" ));
    }
    res.json({status: httpText.SUCCESS , data:{User}});
}
);


const DeleteUser = apperWrrape(async (req , res , next)=>{

    let id = req.params.id;
    const User = await users.findByIdAndDelete(id);
    if(!User){
       return next(ERROR(httpText.FAIL ,null,"User not fond" ));
    }

    res.json({status: httpText.SUCCESS , data:{User}});
}
);

const Login = apperWrrape( async(req , res , next)=>{

    const ERR = validationResult(req);
    
    const {email , password} = req.body;

    if(!ERR.isEmpty()){
        return next(ERROR(httpText.FAIL ,null,ERR.array() ));
    }
    
    const User = await users.findOne({email:email});

    if(!User){
        return next(ERROR(httpText.FAIL ,null,"Email is incorect" ));

    }
     
    const matchPassword = await bcrybt.compare(password , User.password);

    if(!matchPassword){
        return next(ERROR(httpText.FAIL ,null,"Password is incorect" ));
    }

    const Token = await  GenToken({name:User.name , id:User._id ,  role:User.role});

   
      res.json({status:httpText.SUCCESS , data:{token:Token}});
}
)

module.exports = {
    getAllusers,
    getSingleUsers,
    Registry,
    UpdateUser,
    DeleteUser,
    Login
};





