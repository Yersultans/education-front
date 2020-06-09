import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useLazyQuery, gql } from '@apollo/client'
import { Spin } from 'antd'
import Questions from './Questions'
import { useAuth } from '../../context/useAuth'

const GET_DATA = gql`
  query getData($input: QuestionFilterInput) {
    quizby(input: $input) {
      id
      text
      options
      correctAnswers
      subject {
        id
      }
      lesson {
        id
      }
    }
  }
`

const QuizContainer = () => {
  const [questions, setQuestions] = React.useState([])
  const router = useRouter()
  const { user } = useAuth()
  const { lessonId, subjectId, activityId } = router.query
  const [getQuiz, { loading, error, data }] = useLazyQuery(GET_DATA)

  React.useEffect(() => {
    if (subjectId) {
      getQuiz({
        variables: {
          input: { subject: subjectId }
        }
      })
    } else if (lessonId) {
      getQuiz({
        variables: {
          input: { lesson: lessonId }
        }
      })
    } else if (activityId) {
      getQuiz({
        variables: {
          input: { activity: activityId }
        }
      })
    }
  }, [subjectId, lessonId, activityId])

  React.useEffect(() => {
    if (data && data.quizby) {
      setQuestions(data.quizby)
    }
  }, [data, loading, error])
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return (
    <>
      {data && data.quizby && data.quizby.length > 0 && user && (
        <Questions questions={data.quizby} user={user} />
      )}

      {data && data.quizby && data.quizby.length < 1 && user && (
        <div style={{ textAlign: 'center'}}>Пока нету вопросов</div>
      )}

    </>
  )
}

export default QuizContainer
