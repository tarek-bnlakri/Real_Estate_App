import React,{useState} from 'react'
import "./register.scss"
import {Link, useNavigate} from 'react-router-dom'
import {apiRequest} from '../../lib/apiRequest'
function Register() {
    const [err, setErr] = useState(false)
    const navigate=useNavigate()
        const handleSubmit=async(e)=>{
        const formData=new FormData(e.target)
        e.preventDefault()
        const username=formData.get('username')
        const password=formData.get('password')
        const email=formData.get('email')

        console.log(username, password)
        try {
            const res=await apiRequest.post("/auth/register",{username,email,password})
            console.log(res.status)
            navigate('/login')

            
        } catch (error) {
            setErr(true)
                console.log(error)
        }
    }
  return (
    <div className='register'>
        <div className='left'>
            <form onSubmit={handleSubmit}>
                <h3>Create an Account</h3>
                <input name='username' type="text"  placeholder='username'/>
                <input name='email' type="email" placeholder='email'/>
                <input name='password'  type="password" placeholder='password' />
                <button>Register</button>
                {err &&<span style={{color:"red"}}>Could't add user</span>}
                <Link to={"/login"}>Do you have an account ?</Link>
            </form>
        </div>
        <div className='right'><img src="/bg.png" alt="" /></div>
    </div>
  )
}

export default Register