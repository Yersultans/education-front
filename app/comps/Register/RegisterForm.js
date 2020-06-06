import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainLayout = styled.div`
  width: 520px;
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

const RegisterForm = ({ user, onSubmit }) => {
  const [username, setUsername] = useState(user.username)
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const handleSubmit = () => {
    console.log('password', password)
    onSubmit({ username, firstName, lastName, password })
  }
  return (
    <MainLayout>
      <HandImage src="../static/images/hand-emoji.png" />
      <TitleText>Зарегистрироваться в системе!</TitleText>
      <FormItemText>Username</FormItemText>
      <StyledTextInput
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <FormItemText>Имя</FormItemText>
      <StyledTextInput
        type="text"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <FormItemText>Фамилия</FormItemText>
      <StyledTextInput
        type="text"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <FormItemText>Создать пароль</FormItemText>
      <StyledTextInput
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <FormItemText>Повтарить пароль</FormItemText>
      <StyledTextInput
        type="repeatPassword"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
      />
      <StyledSubmitButton
        disabled={
          !username ||
          !password ||
          !repeatPassword ||
          !(password === repeatPassword)
        }
        onClick={handleSubmit}
      >
        Sign Up
      </StyledSubmitButton>
    </MainLayout>
  )
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    school: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default RegisterForm
