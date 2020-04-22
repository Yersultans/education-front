import React, { useEffect } from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { initGA } from 'lib/ReactGA'
import i18n from 'i18n'
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
  uri: 'https://warm-cliffs-58797.herokuapp.com/graphql',
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
  function setEnvOnFront() {
    if (!process.browser || window.env) return
    i18n.changeLanguage('en')
    window.env = {
      BACKEND_URL: 'https://warm-cliffs-58797.herokuapp.com/graphql'
    }
  }

  useEffect(() => {
    initGA()
    setEnvOnFront()
  })

  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <ApolloProvider client={apolloClient}>
        <ProvideMessages>
          <ProvideAuth>
            <Component {...pageProps} />
          </ProvideAuth>
        </ProvideMessages>
      </ApolloProvider>
    </DragDropContextProvider>
  )
}

export default MyApp
