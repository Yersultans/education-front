import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useMessages } from '../../context/useMessages'
import RegisterForm from './RegisterForm'

const MainLayout = styled.div`
  background: #f0f2f5;
  width: 90vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const REGISTER = gql`
  mutation register($input: UserInput!) {
    registerUser(input: $input) {
      id
      username
      role
      firstName
      lastName
      imageUrl
    }
  }
`

const RegisterContainer = () => {
  const router = useRouter()
  const { displayMessage } = useMessages()

  const [register, { data, loading, error }] = useMutation(REGISTER)

  useEffect(() => {
    if (!loading && error) {
      displayMessage({ type: 'error', message: JSON.stringify(error.message) })
    } else if (data && data.registerUser) {
      displayMessage({
        type: 'notify',
        message: 'Успешно зарегистрированный в систему'
      })
      router.push('/login')
    }
  }, [data, loading, error])

  const handleSubmit = values => {
    register({
      variables: {
        input: values
      },
      errorPolicy: 'all'
    })
  }

  return (
    <MainLayout>
      <RegisterForm onSubmit={handleSubmit} />
    </MainLayout>
  )
}

export default RegisterContainer
