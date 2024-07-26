
import  './Login.scss'
import React,{useState,useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { apiRequest } from '../../lib/apiRequest'
import { AuthContext } from '../../context/authContext'
function Login() {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const {updateData}=useContext(AuthContext)
const handleSubmit=async(e)=>{
        const formData=new FormData(e.target)
        e.preventDefault()

        
        const password=formData.get('password')
        const email=formData.get('email')

        console.log(email, password)
        try {
            setLoading(true)
            const res=await apiRequest.post("/auth/login",{email,password})
            console.log(res)
            updateData(res.data)
            setLoading(false)
            navigate('/')
        } catch (error) {
            setErr(true)
            setLoading(false)
                console.log(error)
        }
    }
  return (
    <div className='login'>
        <div className='left'>
            <form onSubmit={handleSubmit}>
                <h3>Welcome Back</h3>
                <input name='email' type="email" placeholder='email'/>
                <input name='password'  type="password" placeholder='password' />
                <button disabled={loading}>Login</button>
                {err &&<span style={{color:"red"}}>Could't Login</span>}
                <Link to={"/register"}>Don't you have an account ?</Link>
            </form>
        </div>
        <div className='right'><img src="/bg.png" alt="" /></div>
    </div>
  )
}

export default Login