import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'
import History from './History'

const GET_DATA = gql`
  query getData($id: ID!) {
    history(id: $id) {
      id
      total
      correctAnswers
      questions {
        id
        isCorrect
        userAnswers
        question {
          id
          text
          correctAnswers
          options
        }
      }
    }
  }
`
const HistoryContainer = () => {
  const router = useRouter()
  const { historyId } = router.query
  const { loading, error, data } = useQuery(GET_DATA, {
    variables: { id: historyId }
  })
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return <>{data && data.history && <History history={data.history} />}</>
}

export default HistoryContainer
