import React from 'react'
import { Helmet } from 'react-helmet'
import LoginContainer from '../comps/Login/Login.container'

function LoginPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Авторизоваться|Education</title>
      </Helmet>
      <LoginContainer />
    </React.Fragment>
  )
}

export default LoginPage
