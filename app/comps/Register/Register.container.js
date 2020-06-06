import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useMessages } from '../../context/useMessages'
import { RegisterForm } from './RegisterForm'
import { useRouter } from 'next/router'

const REGISTER = gql`
  mutation register($input: UserInput!) {
    register(input: $input) {
      id
      username
      firstName
      lastName
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
    } else if (data && data.register) {
      displayMessage({ type: 'notify', message: 'Успешно зарегистрированный в систему' })
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

  return <RegisterForm onSubmit={handleSubmit} />
}

export default RegisterContainer
