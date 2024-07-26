import React,{useState,useContext} from 'react'
import './NavBar.scss'
import { Link } from 'react-router-dom'
import { userData } from '../../lib/dummyData'
import { AuthContext } from '../../context/authContext'
function NavBar() {
    const [menu, setMenu] = useState(false)
    const {currentUser:user}=useContext(AuthContext)
  
   
  return (
    <nav>

        <div className="left">
            <a className='logo' href='/'>
                <img src="/logo.png" alt="logo" />
                <span>TarekEstate</span>
            </a>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/agents">Agent</a>
        </div>

        <div className="right">
            {user?<div className='authUser'>
                        <p> 
                            <img src={user.avatar||"/nouser.jpg"} alt="" />
                            <span>{user.username}</span>
                        </p>
                        <Link to={`/profile`}>
                            Profile
                            <span>3</span>
                        </Link>
                  </div>
                :<>
                    <a href="/login">Sign in</a>
                    <a className='register' href="/register">Sign up</a>
                </>
            }
            

            <div onClick={()=>setMenu(!menu)} className="menuIcon">
                <img src="/menu.png" alt="" />
            </div>

            <div  className={menu?"menu active":"menu"}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/agents">Agent</a>
            <a href="">Sign in</a>
            <a className='register' href="">Sign up</a>

            </div>
        </div>

    </nav>
  )
}

export default NavBar