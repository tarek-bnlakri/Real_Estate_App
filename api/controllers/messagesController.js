import prisma from "../lib/prisma.js"

export const addMessage=async(req,res)=>{
    const userId = req.userId
    const chatId = req.params.chatId
    const text   = req.body.text
    try {
        const isChat= await prisma.chat.findUnique({
            where:{
                id:chatId,
                userIDs:{
                    hasSome:[userId]
                }
            }
        })
        if(!isChat) return res.status(404).json({message:"Not Found"})
        const message = await prisma.message.create({
            data:{
                text,
                userId,
                chatId

            }
         })
         await prisma.chat.update({
            where:{
                id:isChat.id
            },
            data:{
                seenBy:[userId],
                lastMessage:text
            }
         })
         return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error updating chat and creating new message"})
    }
}