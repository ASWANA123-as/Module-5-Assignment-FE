import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children,roles=[]}) {
    const raw=localStorage.getItem('user')
    const user=raw?JSON.parse(raw):null
    console.log(user,roles,'rrrr')
    if(!user)
        return <Navigate to="/login"/>
console.log(user.userType,'pppp');
        if(roles && !roles.includes(user.userType)){
             console.log(roles)
            console.log('ooo')
           return <Navigate to="/login"></Navigate>
        }
           
            return children

}

export default ProtectedRoute