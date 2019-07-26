/* eslint-disable import/no-unresolved */
import React from 'react'
import Login from './login'
import SignUp from './signup'

const Auth = () => {
  document.title = 'Auth'
  return (
    <div className="auth-main-block">
      <SignUp />
      <Login />
    </div>
  )
}

export default Auth
