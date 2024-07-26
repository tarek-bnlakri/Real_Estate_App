import prisma from "../lib/prisma.js"

export const getAllChats=async(req,res)=>{
    const userId=req.userId
    try {
        const chats= await prisma.chat.findMany({
            where:{
                userIDs:{
                    hasSome:[userId]
                }
            }
        })
        for(const chat of chats){
            const resciverId= chat.userIDs.find((id)=> id !== userId)
            const user = await prisma.user.findUnique({
                where:{
                    id:resciverId
                },
                select:{
                    id:true,
                    avatar:true,
                    username:true,
                }
            })
            chat.reciver=user
        }
        return res.status(200).json(chats)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Could not get chats"})
    }

}
export const getChat=async(req,res)=>{
    const chatId=req.params.id
    const userId = req.userId
    try {
        const chat=await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{hasSome:[userId]}
            },
            include:{
                messages:{
                    orderBy:{
                        created_at:"asc"
                    }
                }
            }
        })
        if (!chat.seenBy.includes(userId)) {
            await prisma.chat.update({
                where:{
                    id:chat.id
                },
                data:{
                    seenBy:{
                        push:[userId]
                    }
                }
            })
    }
        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Couldn't find chat"})
    }

}
export const addChat=async(req,res)=>{
    const userId =req.userId
    const resciverId= req.body.resciverId
    try {
        const newChat= await prisma.chat.create({
            data:{
                userIDs:[userId,resciverId]
            }
        })
        res.status(200).json(newChat)
    } catch (error) {
        console.log(error)
        res.status(500).json("error creating chat") 
    }

}
export const readChat=async(req,res)=>{
    const userId= req.userId
    try {
        const chat = await prisma.chat.update({
            where:{
                id:req.params.id
            },
            data:{
                seenBy:{
                    set:[userId]

                }
            }

        })
        res.status(200).json(chat)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error updating chat"})
    }
}