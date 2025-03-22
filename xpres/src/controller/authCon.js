const authService = require("../service/authService")
const input = {
    user : "dudu",
    pw : 123123
}
const login = async(req, res)=>{
   try{
    const result = await authService.login(input);
   
    res.status(200).json({
    data: result    
    })
}
catch(error){
    res.status(400).json({
        data: "Something weomt"    
        })
} 
}

const register = async (req,res)=>{
    const regInput = req.body
try{
    const result = await authService.register(regInput);
    res.status(200).json({
    data: result
})
}
catch(error){
    res.status(400).json({
        data: "Something wrong"    
        })
} 
}




module.exports={login, register};