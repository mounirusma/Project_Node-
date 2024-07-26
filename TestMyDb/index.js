const express  = require("express");
const mongosse = require("mongoose");
const Cors = require("cors");
const ControlerUser = require("./Routers/users");
require("dotenv").config();
const httpText = require("./UTILS/httpText");
const path = require("path");
const app = express();

app.use(express.json());
app.use(Cors());

const url = process.env.MONGO_URL;

mongosse.connect(url).then(()=>{
    console.log("mongose is runinng");
});

// router to file uploads
app.use('/uploads' , express.static(path.join(__dirname , 'upload')));


//Middleware to access the routerUser
app.use("/api/users" , ControlerUser)


//Middleware hundle router not valid 
app.all("*" , (req , res)=>{
    res.json({status:httpText.ERROR , data:null , message:"Resource not Found" , code:404});
})

//MiddleWare to hundle Error
app.use((error , req , res , next )=>{
    res.json({status:error.status|| httpText.ERROR , data:null , message:error.message });
})


app.listen(process.env.PORT , ()=>{
    console.log("Server runinng in port 5000");
})
