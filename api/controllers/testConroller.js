import jwt from 'jsonwebtoken'

export const shouldBeLoggedIn=async(req,res)=>{
        console.log(req.userId)
        return res.status(200).json({message:"You are  Authenticated"})
 
 
}

export const shouldBeAdmin=async(req,res)=>{
    const token = req.cookies.token
    if(!token) return res.status(401).json({message:"Not Authenticated"})
    
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,async(err,payload)=>{
        if(err) return res.status(403).json({message:"token is not Valid"})
        if(!payload.isAdmin){
                return res.status(403).json({message:"Not Authorized"})
            }
            return res.status(200).json({message:"You are  Authorized"})
    })
    

}