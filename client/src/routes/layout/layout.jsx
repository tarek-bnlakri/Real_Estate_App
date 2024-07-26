import React,{useContext} from 'react'
import "./layout.scss"
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import { AuthContext } from '../../context/authContext'
function Layout() {
  return (
    <div className='layout'>
        <NavBar/>
        <div className="content">
            <Outlet/>
        </div>
    
  </div>
  )
}
function AuthLayout() {
  const {currentUser}=useContext(AuthContext)

  return (
    
    <>{currentUser?
      <div className='layout'>
        <NavBar/>
        <div className="content">
            <Outlet/>
        </div>
     </div>:<Navigate to={'/login'}/>
    }
     </>
  )
}

export  {Layout,AuthLayout}