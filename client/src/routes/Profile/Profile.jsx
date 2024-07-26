import React ,{useState,useContext}from 'react'
import './Profile.scss'
import { Await,useLoaderData} from "react-router-dom";
import Card from '../../components/Card/Card'
import {apiRequest} from '../../lib/apiRequest'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { userPosts } from '../../lib/loaders';
import Chat from '../../components/Chat/Chat';
function Profile() {
  const data=useLoaderData()
  const [chatMessage, setChatMessage] = useState(true)
  const navigate=useNavigate()
  const {updateData,currentUser:userData} = useContext(AuthContext)
  
  const handleLogout =async()=>{
    try {
        const res = await apiRequest.post('/auth/logout')  
        updateData(null)
        navigate('/')
        console.log(res)
      } catch (error) {
        console.log(error)
    }
    

  }
  return (
    <div className='profile'>
      <div className='left'>
          <div className="wrapper">
            <div className='top'>
              <div className='head'>
                <h1>User Information</h1>
                <Link to={'/profile/update'}>
                  <button>Update Pfrofile</button>
                </Link>
              </div>
              <div className='body'>
                <p>
                  <sapn>Avatar:</sapn>
                  <img src={userData.avatar||'/nouser.jpg'}/>
                </p>
                <p>
                  <sapn>Username:</sapn>
                  <sapn className="bold">{userData.username}</sapn>
                </p>
                <p>
                    <sapn>E-mail:</sapn>
                    <sapn className="bold">{userData.email}</sapn>
                </p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
            <div className='down'>
              <div className="head">
                <h1>My List</h1>
                <Link to={'/new-post'}>
                  <button>Create New Post</button>
                </Link>
              </div>
              <div className="cardContatiner">
                    <React.Suspense fallback={<p>Loading posts...</p>}>
                              <Await
                                resolve={data.postResponce}
                                errorElement={
                                  <p>Error loading posts </p>
                                }
                              >
                                {(postResponce) => (
                                  postResponce.data.userPost.map(post=><Card key={post.id} item={post}/>)
                                )}
                              </Await>
                    </React.Suspense>
              </div>
            </div>
            <div className='down'>
              <div className="head">
                <h1>My Saved List</h1>
              </div>
              <div className="cardContatiner">
                    <React.Suspense fallback={<p>Loading saved posts...</p>}>
                              <Await
                                resolve={data.postResponce}
                                errorElement={
                                  <p>Error loading posts </p>
                                }
                              >
                                {(postResponce) => (
                                 postResponce.data.userSavedPost.map(item=><Card key={item.id} item={item.post}/>)
                                )}
                              </Await>
                    </React.Suspense>
              </div>
            </div>
        </div>
      </div>
      <div className='right'>
        <div className="wrapper">
          <div className="top">
              <h1>Messages</h1>
              <div className="container">
                <React.Suspense fallback={<p>Loading Chats ...</p>}>
                      <Await
                          resolve={data.chatResponce}
                            errorElement={
                            <p>Error loading posts </p>
                            }
                      >
                      {(chatResponce) => (
                        // console.log(chatResponce)
                        chatResponce.data.map(item=><Chat key={item.id} chat={item}/>)
                      )}
                      </Await>
                </React.Suspense>
              </div>
            </div>
            
        </div>
          
          
      </div>
    </div>
  )
}

export default Profile