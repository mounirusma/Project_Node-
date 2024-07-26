
const apperWrrape = (fn)=>{
    return ((req , res , next)=>{
        fn(req , res , next).catch((err)=>{
            next(err)
        })

    })
}

module.exports = apperWrrape;