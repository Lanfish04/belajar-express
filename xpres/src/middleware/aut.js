const test = (req,res,next) =>{
    const id = req.params.id
    const token = "asda"
    if (token){
        req.user = id
       next(); 
    }
    else{
        throw Error("anda blum lgon")
    }
}


module.exports=test