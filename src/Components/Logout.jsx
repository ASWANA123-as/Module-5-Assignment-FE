import React from 'react'
import { useNavigate } from 'react-router-dom'
//Logout
function Logout() {
    const nav=useNavigate()
    const handlelogout=()=>{
        localStorage.removeItem("user")
        nav("/login")
    }
  return (
    <div>
        <button onClick={handlelogout}>Logout</button>
    </div>
  )
}

export default Logout