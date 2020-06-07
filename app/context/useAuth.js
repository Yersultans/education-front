import React, { useState, useEffect, useContext, createContext } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      username
      role
      firstName
      lastName
      imageUrl
    }
  }
`

const LOGOUT = gql`
  mutation logout {
    logout {
      message
    }
  }
`

const authContext = createContext()

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [sendLogout] = useMutation(LOGOUT)

  const router = useRouter()

  const {
    data,
    loading,
    error,
    refetch,
    networkStatus
  } = useQuery(GET_CURRENT_USER, { notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (!loading && data && data.getCurrentUser) {
      setUser(data.getCurrentUser)
    }
  }, [data, loading, error, networkStatus])

  function fetchUser() {
    refetch()
  }

  function logout() {
    sendLogout()
    localStorage.removeItem('clientToken')
    setUser(null)
    router.push('/login')
  }

  function checkUserIsLoggedIn() {
    return localStorage.getItem('clientToken') !== null
  }

  // Return the user object and auth methods
  return {
    user,
    checkUserIsLoggedIn,
    fetchUser,
    logout
  }
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext)

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired
}
