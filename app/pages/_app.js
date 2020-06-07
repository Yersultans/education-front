import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat
} from '@apollo/client'
import '../styles/index.css'
import '../styles/theme.less'

import { ProvideAuth } from '../context/useAuth'
import { ProvideMessages } from '../context/useMessages'

const httpLink = new HttpLink({
  uri: 'https://education-admin.herokuapp.com/graphql',
  fetch
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('clientToken')
        ? `Bearer ${localStorage.getItem('clientToken')}`
        : null
    }
  })

  return forward(operation)
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ProvideMessages>
        <ProvideAuth>
          <Component {...pageProps} />
        </ProvideAuth>
      </ProvideMessages>
    </ApolloProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired
}

export default MyApp
