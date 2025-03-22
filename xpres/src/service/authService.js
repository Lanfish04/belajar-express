const correct = {
    username: 'dudung',
    password: 123123123
}

const login = async(data)=>{
    const {user, pw} = data

 if(user === correct.username && pw === 123123123){
     return data
 } 
throw new Error("Something wrong")
}



module.exports={login}