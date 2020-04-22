import React, { useContext, createContext, useState, useEffect } from 'react'
import { message } from 'antd'
import PropTypes from 'prop-types'

const messagesContext = createContext()

function useProvideMessages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (messages.length > 0) {
      if (messages[0].type === 'notify') {
        message.success(messages[0].message, 1)
      } else if (messages[0].type === 'error') {
        message.error(messages[0].message, 2)
      }
      setMessages(messages.slice(1))
    }
  }, [messages])

  const displayMessage = msg => {
    setMessages([...messages, msg])
  }

  return { displayMessage }
}

export function ProvideMessages({ children }) {
  const messages = useProvideMessages()
  return (
    <messagesContext.Provider value={messages}>
      {children}
    </messagesContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(messagesContext)
}

ProvideMessages.propTypes = {
  children: PropTypes.node.isRequired
}
