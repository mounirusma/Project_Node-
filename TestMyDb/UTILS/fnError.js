module.exports =(status , data , message )=>{
    const ERROR = new Error();
    ERROR.status =status;
    ERROR.data = data;
    ERROR.message = message;
    return ERROR;

}

