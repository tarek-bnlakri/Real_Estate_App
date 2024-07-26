import prisma from "../lib/prisma.js"
import jwt from 'jsonwebtoken'
export const getPosts=async(req,res)=>{
    const query= req.query
    try {
        const posts = await prisma.post.findMany({
            where:{
                price:{
                    gte: parseInt(query.minPrice)||0,
                    lte:parseInt(query.maxPrice)||10000000,
                },
                bedroom:parseInt(query.bedroom) || undefined,
                city:query.city || undefined,
                type:query.type || undefined,
                property:query.property || undefined,
            }
        })
        console.log(posts)
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Couldn't find any posts"})
    }
    
}
export const getPost=async(req,res)=>{
    const id= req.params.id
    const token = req.cookies?.token
    let userId= null
    if(token){
        try {
            const payload= jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
             userId= payload.userId
        }catch (error) {
            console.log(error)
            return res.status(403).json({message:"Unauthorized"}) 
        }
    }
   
    console.log("userId",userId)
    try {
            const post =await prisma.post.findUnique({
                where:{id},
                include:{
                    postdetail:true,
                    user:{
                        select:{
                            avatar:true,
                            username:true              
                        }
                    },
                    savedPosts:userId?{
                        where:{
                            userId
                        }
                    }:false
                }
            })
            if(!post){
                return res.status(404).json({message:"post not found"})
            }
            const isSaved=userId?post.savedPosts.length>0:false
            return res.status(200).json({...post,isSaved})
    }
        
       
     catch (error) {
        console.log(error)
        return res.status(500).json({message:"Couldn't find  post"})
    }
}
export const updatePost=async(req,res)=>{
    const id= req.params.id
    try {
        const post= await prisma.post.findUnique({where:{id}})
        if(!post || post.userId !== req.userId)
            return res.status(404).json({message:"Could not find post "})
        const {price,title,bedroom,bathroom,city,address,img,latitude,longitude,type,property}=req.body
        const data = { price, title, bedroom, bathroom, city, address, img, latitude, longitude, type, property };
        const filtredData= Object.keys(data).reduce((acc, key) =>{
            if(data[key] !== undefined){
                acc[key] = data[key]
            }
            return acc

        },{})
        const updatePost=await prisma.post.update({
            where:{id},
            data:filtredData
        })
        return res.status(200).json(updatePost)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Couldn't update post"})
    }
    
   

}
export const deletePost=async(req,res)=>{
    const id = req.params.id
    try {
        const post = await prisma.post.findUnique({
            where:{id}
        })
        if(!post) return res.status(404).json({message:" Couldn't find post"})
        if(post.userId !==req.userId) return res.status(403).json({message:"Not authorized"})
        
            const deletepost= await prisma.post.delete({where:{ id}})
            return res.status(204).json({message:"Deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Couldn't delete post"})
    }

}
export const createPost=async(req,res)=>{
        console.log(req.body)
        const body=req.body
        const userId=req.userId
    try {
        const createpost=await prisma.post.create({
            data:{
                ...body.postData,userId,
                postdetail:{create:body.postdetail}
            }
        })
       return res.status(200).json(createpost)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Couldn't create post"})
    }
}