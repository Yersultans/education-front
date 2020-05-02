import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const HistoryDiv = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 16px;
  :hover {
    color: #1746dd;
    background: #e6f7ff;
  }
`
const HistoryName = styled.div``
const HistoryRow = styled.div``
const HistoryResult = styled.div``

const HistoryCard = ({ history, index }) => {
  const router = useRouter()
  return (
    <HistoryDiv
      onClick={() => {
        router.push({ pathname: '/history', query: { historyId: history.id } })
      }}
    >
      <HistoryName>Тест #{index}</HistoryName>
      <HistoryRow>
        <HistoryResult>
          {history.correctAnswers}
          {' / '}
          {history.total}
        </HistoryResult>
      </HistoryRow>
    </HistoryDiv>
  )
}
HistoryCard.propTypes = {
  history: PropTypes.shape({
    id: PropTypes.string,
    correctAnswers: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  index: PropTypes.number.isRequired
}

export default HistoryCard
