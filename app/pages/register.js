import React from 'react'
import { Helmet } from 'react-helmet'
import RegisterContainer from '../comps/Register/Register.container'

function RegisterPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Register|Education</title>
      </Helmet>
      <RegisterContainer />
    </React.Fragment>
  )
}

export default RegisterPage
