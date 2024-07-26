import prisma from "../lib/prisma.js"
import bcrypt from 'bcrypt'

export const getUsers=async(req,res)=>{
   try {
    const users=await prisma.user.findMany()
    res.status(200).json({users:users})
   } catch (error) {
        return res.status(501).json("Failed to find users")
   } 
}

export const getUser=async(req,res)=>{
    const id = req.params.id
    try {
        const user=await prisma.user.findUnique({
            where:{
                id
            }
        })
        res.status(200).json({user:user})
       } catch (error) {
            return res.status(501).json("Failed to find users")
       } 
}

export const updateUser=async(req,res)=>{
    const id = req.params.id
    const userId=req.userId
    if(userId !== id)
            return res.status(403).json({message:"Not Authorized"})

    const {username,email,password,avatar} = req.body
    
    try {
        const data={username,email}
        if(password){
            const cryptPassword =await bcrypt.hash(password,10)
            data.password=cryptPassword
        }
        if(avatar){
            data.avatar=avatar
        }
     console.log(avatar)
        const updateUser=await prisma.user.update({where:{id},data})
        const {password:userPass,...rest}=updateUser
        res.status(200).json({message:"user Updated",rest})
       } catch (error) {
        console.log(error)
            return res.status(501).json("Failed to update user")
       } 
}

export const deleteUser=async(req,res)=>{
    const id = req.params.id
    const userId = req.userId

    if(id!== userId){
        return res.status(403).json({message: "Not Authorized"})
    }
    try {
        const deletedUser=await prisma.user.delete({
            where:{id}
        })
        return res.status(200).json({message:"User Deleted "})
        
    } catch (error) {
            return res.status(500).json({message: "Failed to delete user"})
    }
}

export const savePost=async(req,res)=>{
    const postId= req.body.postId
    const userId= req.userId
    console.log(postId,userId)
    try {
        const isSaved = await prisma.savedPost.findUnique({
            where:{
                postId,userId
            }
        })
        if(isSaved){
            const unsaved=await prisma.savedPost.delete({
                where:{
                    id:isSaved.id
                }
            })
            return res.status(200).json({message:"post unsaved successfully"})
        }else{
            const saved=await prisma.savedPost.create({
                data:{
                    userId,
                    postId
                }
            })
            return res.status(200).json({message:"post saved successfully"})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"error saving post"})
    }
}

export const getUserPosts=async(req,res)=>{
    const userId = req.userId
    try {
        const userPost=await prisma.post.findMany({
            where:{
                userId
            }
        })
        const userSavedPost= await prisma.savedPost.findMany({
            where:{userId},
            include:{
                post:true
            }
        })
        return res.status(200).json({userPost,userSavedPost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Couldn't find user posts"})
    }
}