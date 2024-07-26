
const express = require("express");
const {getAllusers , getSingleUsers, Registry , UpdateUser, DeleteUser , Login} = require("../Controoles/Controle_user")
const validation = require("../Middlewars/Validation");
const VerifyToken = require("../Middlewars/VerifyToken");
const validationLogin = require("../Middlewars/ValidationLogin");
const verifyRoles = require("../Middlewars/verifyRoles");
const Roles = require("../UTILS/Roles");
const multer = require("multer");
const Route = express.Router();
const Err = require("../UTILS/fnError");
const httpText = require("../UTILS/httpText");

// files upload
const storage  = multer.diskStorage({
    destination:function(req , file , cb){
          cb(null , 'upload');
    },
    filename : function(req , file , cb){
        const ext = file.mimetype.split("/")[1];
        const name = `user-${Date.now()}.${ext}`;
        cb(null , name);
    }
})

const fileFilter = ( req , file , cb)=>{

    const typeFile =  file.mimetype.split("/")[0];
     if(typeFile =="image"){
        cb(null , true)
     }else {
        cb(Err(httpText.ERROR , null , "Your file required image") , false);
     }
}

const upload = multer({storage , fileFilter});



Route.route("/")
                .get(VerifyToken, getAllusers)
                .post(validation(),Registry);

Route.route("/:id")
                   .get(getSingleUsers)
                    .patch(UpdateUser)
                     .delete(VerifyToken ,verifyRoles(Roles.ADMIN) , DeleteUser);

Route.route("/registry").post( upload.single("avatar"), Registry); 
Route.route("/Login").post( validationLogin(), Login);

module.exports=Route;
