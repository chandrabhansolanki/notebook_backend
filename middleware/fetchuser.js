const jwt = require("jsonwebtoken")
const JWT_SECRET = "MYNAMEISCHANDRABHANSINGHSOLANKI";


const fetchuser = (req,res,next) => {
 // Get the user from jwt token and add id to req body

const token = req.header("Authorization")
if(!token){
   return res.status(401).send({error:"Please Authenticate using a valid token."})
}
try{
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data.user
}catch(error){
    res.status(401).send({error:"Please Authenticate using a valid token."})
}
 next()
}

module.exports = fetchuser