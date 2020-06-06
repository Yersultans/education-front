import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useMessages } from '../../context/useMessages'
import LoginForm from './LoginForm'
import { useAuth } from '../../context/useAuth'

const MainLayout = styled.div`
  background: #f0f2f5;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LOGIN = gql`
  mutation login($input: LoginUserInput) {
    loginUser(input: $input) {
      token
    }
  }
`

const LoginContainer = () => {
  const [login, { data, error, loading }] = useMutation(LOGIN)
  const router = useRouter()
  const { fetchUser } = useAuth()
  const { displayMessage } = useMessages()

  useEffect(() => {
    if (!loading && error) {
      displayMessage({ type: 'error', message: JSON.stringify(error.message) })
    } else if (data && data.loginUser && data.loginUser.token) {
      localStorage.setItem('clientToken', `${data.loginUser.token}`)
      fetchUser()
      router.push('/')
      displayMessage({ type: 'notify', message: 'Успешно вошли в систему' })
    }
  }, [data, loading, error])

  const handleSubmit = values => {
    login({
      variables: {
        input: values
      },
      errorPolicy: 'all'
    })
  }
  return (
    <MainLayout>
      <LoginForm onSubmit={handleSubmit} />
    </MainLayout>
  )
}

export default LoginContainer
