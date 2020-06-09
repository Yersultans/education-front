import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/useAuth'
import { useRouter } from 'next/router'
import Home from './Home'


const IndexConatiner = () => {
  const { checkUserIsLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (checkUserIsLoggedIn()) {
      router.push('/subjects')
    }
  },[])

  return (
    <Home />
  )
}

export default IndexConatiner
