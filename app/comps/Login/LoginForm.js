import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainLayout = styled.div`
  width: 520px;
  height: 568px;
  background: #ffffff;
  border-radius: 8px;
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  align-items: left;
`

const HandImage = styled.img`
  width: 56px;
  height: 56px;
`

const TitleText = styled.div`
  margin: 24px 0px;
  font-family: GT Walsheim;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: #333333;
`

const FormItemText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: rgba(51, 51, 51, 0.6);
  margin-top: 24px;
  margin-bottom: 16px;
`

const StyledTextInput = styled.input`
  height: 48px;
  background: #fbfbfb;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
`

const StyledSubmitButton = styled.button`
  margin-top: 56px;
  height: 48px;
  background: #fdd842;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #212428;
`

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleFormSubmit() {
    onSubmit({ username, password })
  }

  return (
    <MainLayout>
      <HandImage src="../static/images/hand-emoji.png" />
      <TitleText>Welcome back!</TitleText>
      <FormItemText>Username</FormItemText>
      <StyledTextInput
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <FormItemText>Password</FormItemText>
      <StyledTextInput
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <StyledSubmitButton onClick={handleFormSubmit}>Login</StyledSubmitButton>
    </MainLayout>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
