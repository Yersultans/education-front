import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'
import HistoryCard from './HistoryCard'

const GET_HISTORY = gql`
  query getData($id: ID!) {
    historyByUser(id: $id) {
      id
      total
      correctAnswers
    }
  }
`
const HistoriesContainer = ({ user }) => {
  const [histories, setHistories] = useState(null)
  const { loading, error, data } = useQuery(GET_HISTORY, {
    variables: { id: user.id }
  })
  useEffect(() => {
    if (data && data.historyByUser) {
      const array = Object.values(data.historyByUser)
      setHistories(array.reverse())
    }
  }, [data])

  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return (
    <>
      {histories &&
        histories.map((history, index) => (
          <HistoryCard history={history} index={histories.length - index} />
        ))}
    </>
  )
}

HistoriesContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
}
export default HistoriesContainer
