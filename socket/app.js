import {Server} from 'socket.io'

const io = new Server({
    cors:{
        origin:"http://localhost:5173"
    }
})

let onlineUsers=[]

function addNewUser(userId,socketId){
    const isUserExist=onlineUsers.find(user=>user.userId=== userId);
    if(!isUserExist){
        onlineUsers.push({userId,socketId})
    }
}

function removeUser(socketId){
    onlineUsers=onlineUsers.filter(user=>user.socketId !==socketId);
}

function getUser(userId){
    return onlineUsers.find(user=>user.userId === userId)
}

io.on('connection',(socket)=>{
    
    socket.on('newUser',(userId)=>{
        addNewUser(userId,socket.id)
        console.log(onlineUsers)
    })
    socket.on('sendMessage',({receiverId,data})=>{
        console.log(receiverId,data)
        const reciver = getUser(receiverId,data)
        io.to(reciver.socketId).emit('getMessage',data)
    })
    socket.on('disconnect',()=>{
        removeUser(socket.id)
    })
})


io.listen('4000')