import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'
import Questions from './Questions'

const GET_DATA = gql`
  query getData($input: QuestionFilterInput) {
    quizby(input: $input) {
      id
      text
      options
      correctAnswers
    }
  }
`

const QuizContainer = () => {
  const router = useRouter()
  const { lessonId, subjectId } = router.query
  const { loading, error, data } = useQuery(GET_DATA, {
    variables: {
      input: subjectId ? { subject: subjectId } : { lesson: lessonId }
    }
  })
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return <>{data && data.quizby && <Questions questions={data.quizby} />}</>
}

export default QuizContainer
