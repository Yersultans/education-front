import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/useAuth'
import Home from './Home'


const IndexConatiner = () => {
  const { checkUserIsLoggedIn } = useAuth()

  useEffect(() => {
    if (!checkUserIsLoggedIn()) {
      router.push('/login')
    }
  })
  return (
    <Home />
  )
}

export default IndexConatiner
