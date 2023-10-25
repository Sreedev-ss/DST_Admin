/* eslint-disable */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isConfirmed = window.confirm("Are you sure you want to sign out?");
    if(isConfirmed){
      localStorage.removeItem('token')
      navigate('/authentication/sign-in')
    }else{
      navigate('/dashboard')
    }
  }, [])
  return (
    <div>

    </div>
  )
}

export default SignOut
