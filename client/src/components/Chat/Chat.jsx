import React,{useContext, useState,useEffect,useRef} from 'react'
import './Chat.scss'
import { AuthContext } from '../../context/authContext'
import { apiRequest } from '../../lib/apiRequest'
import {format} from 'timeago.js'
import { SocketContext } from '../../context/SocketContext'

function Chat({chat}) {
  console.log(chat)
    const [chatBox, setChatBox] = useState(null)
    const {currentUser}=useContext(AuthContext) 
    const {socket}=useContext(SocketContext) 
   const  refEndMessage=useRef()
   useEffect(() => {
     refEndMessage.current?.scrollIntoView()
   }, [chatBox])
   
    async function handleChatBox(chatId,reciver){
    
      try {
          const res= await apiRequest.get('/chats/'+chatId);
          setChatBox({...res.data,reciver});
        
      } catch (error) {
        console.log(error)
      }

    }
    async function handleSendMessage(e){
      e.preventDefault()
      const formData= new FormData(e.target)
      const text= formData.get('text')
      try {
          const res = await apiRequest.post('messages/'+chat.id,{text})
          setChatBox(prev=>({...prev,messages:[...prev.messages,res.data]}))
          e.target.reset();
          socket.emit("sendMessage", {
            receiverId: chat.reciver.id,
            data: res.data,
          });
        } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      const read=async()=>{
        console.log(chatBox.id)
        try {
          await apiRequest.put('chats/read/'+chatBox.id)
        } catch (error) {
          console.log(error)
        }
      }
      if(chatBox && socket){
        socket.on('getMessage',(message)=>{
          console.log(message)
          if(chatBox.id === message.chatId)
          setChatBox(prev=>({...prev,messages:[...prev.messages,message]}))
          read()
        })
      }
      return () => {
        socket.off("getMessage");
      };
    
      
    },[socket,chatBox])
    
  return (
    <div className='chat'>
        <div onClick={()=>handleChatBox(chat.id,chat.reciver)} className='message'>
                <img src={chat.reciver.avatar || '/nouser.jpg'} alt="" />
                <h3>{chat.reciver.username}</h3>
                <p style={{
                    backgroundColor:chat.seenBy.includes(currentUser.id) ?'white':"yellow"
                }}>{chat.lastMessage}</p>
        </div>
        {chatBox&&<div className="down">
              <div className={chatBox?"chatcontainee":"chatcontainee disable"}>
                <div className="head">
                  <div className='userInfo'>
                    <img src={chatBox.reciver.avatar || '/nouser.jpg'} alt="" />
                    <span>{chatBox.reciver.username}</span>
                  </div>
                  <span onClick={()=>setChatBox(null)}>X</span>
                </div>
                <div className="body">
                      {chatBox.messages.map(message=>(
                      <div  key={message.id} className={message.userId===currentUser.id?"usermessage own":"usermessage"}>
                        <p>{message.text}</p>
                        <span>{format(message.created_at)}</span>
                        <div ref={refEndMessage}></div>
                      </div>
                     
                      ))
                      }
                </div>
                <form onSubmit={handleSendMessage} className="inputContainer">
                  <textarea name='text' type="text" ></textarea>
                  <button>Send</button>
                </form>
              </div>
            </div>}
          
    </div>
  )
}

export default Chat