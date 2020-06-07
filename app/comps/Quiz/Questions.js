import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { Radio, Checkbox, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm, info } = Modal

const MainLayout = styled.div`
  display: flex;
  padding: 32px;
  width: 100%;
  height: 90vh;
  background: #fff;
`
const QuestionsDiv = styled.div`
  width: 100%;
  flex-direction: column;
  overflow: auto;
`
const Question = styled.div``
const QuestionTitle = styled.div`
  display: flex;
  font-size: 22px;
`
const Options = styled.div`
  dispaly: flex;
`
const OptionGroup = styled(Radio.Group)``
const OptionButton = styled(Radio)`
  display: block;
`
const OptionsCheckbox = styled(Checkbox.Group)``
const OptionCheckbox = styled(Checkbox)``
const QuestionsPagination = styled.div`
  width: 320px;
  height: fit-content;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`
const QuestionTable = styled.div`
  ${p =>
    p.selected &&
    `
  color: #1746DD;
  background: #e6f7ff;
  
`}
  ${p =>
    p.ans &&
    `
  background: #009788;
  border: 1px solid #008278;
  color: #ffffff;
  `}
  padding: 10px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin: 1px;
  :hover {
    color: #1746dd;
    background: #e6f7ff;
  }
`
const QuestionName = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 15px;
  padding-top: 15px;
`

const QuizDiv = styled.div`
  display: flex;
  padding-bottom: 10px;
  padding-top: 10px;
`
const FinishDiv = styled.div`
  text-align: center;
`
const FinishButton = styled.button`
  background: #009788;
  border: 1px solid #008278;
  color: #ffffff;
  font-size: 14.4px;
  padding: 10px 20px 10px 20px;
`

const ADD_HISTORY = gql`
  mutation addHistory($input: HistoryFilterInput) {
    addHistory(input: $input) {
      id
      user {
        id
      }
      questions {
        id
      }
    }
  }
`
const Questions = ({ questions, user }) => {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id)
  const [answers, setAnswers] = useState(
    questions.map(question => {
      return {
        question: question.id,
        user: user.id,
        lesson: question.lesson.id,
        subject: question.subject.id,
        userAnswers: [],
        isCorrect: false
      }
    })
  )
  const [addHistory] = useMutation(ADD_HISTORY)
  const handleRadioChange = (question, answer, index) => {
    const isCorrect = questions[index].correctAnswers[0] === answer
    setAnswers(
      answers.map((ans, key) => {
        return key === index
          ? {
              question: question.id,
              user: user.id,
              lesson: ans.lesson,
              subject: ans.subject,
              userAnswers: [answer],
              isCorrect
            }
          : ans
      })
    )
  }
  const handleCheckboxChange = (question, userAnswers, index) => {
    const isCorrect = question[index].correctAnswers === userAnswers
    setAnswers(
      answers.map((ans, key) => {
        return key === index
          ? {
              question: question.id,
              user: user.id,
              lesson: ans.lesson,
              subject: ans.subject,
              userAnswers: answers,
              isCorrect
            }
          : ans
      })
    )
  }
  const handleFinish = () => {
    const corrects = answers.filter(answer => answer.isCorrect === true)
    confirm({
      title: 'Вы уверены что хотите закончить тест?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      cancelText: 'Нет',
      onOk() {
        addHistory({
          variables: {
            input: {
              answers,
              total: answers.length,
              correctAnswers: corrects.length
            }
          }
        })
        info({
          title: 'Результаты:',
          content: `Ваш результат: ${corrects.length}/${answers.length}`,
          closable: false,
          okText: 'Да',
          onOk() {
            router.push({ pathname: '/profile' })
          }
        })
      },
      onCancel() {
        console.log('Cancel')
      }
    })

    console.log('answers', answers)
  }
  return (
    <MainLayout>
      <QuestionsDiv>
        {questions.map(
          (question, index) =>
            currentQuestion === question.id && (
              <Question key={question.id}>
                <QuestionTitle
                  dangerouslySetInnerHTML={{
                    __html: `${index + 1}. ${question.text}`
                  }}
                />
                <Options>
                  {question && question.correctAnswers.length < 2 && (
                    <OptionGroup
                      value={
                        answers &&
                        answers[index] &&
                        answers[index].userAnswers[0]
                      }
                      onChange={e =>
                        handleRadioChange(question, e.target.value, index)
                      }
                    >
                      {question.options.map(option => (
                        <OptionButton value={option} key={option}>
                          {option}
                        </OptionButton>
                      ))}
                    </OptionGroup>
                  )}
                  {question && question.correctAnswers.length > 1 && (
                    <OptionsCheckbox
                      defaultValue={
                        answers && answers[index] && answers[index].userAnswers
                      }
                      onChange={e => handleCheckboxChange(question, e, index)}
                    >
                      {question.options.map(option => (
                        <OptionCheckbox value={option} key={option}>
                          {option}
                        </OptionCheckbox>
                      ))}
                    </OptionsCheckbox>
                  )}
                </Options>
              </Question>
            )
        )}
      </QuestionsDiv>
      <QuestionsPagination>
        <QuestionName>ВОПРОСЫ:</QuestionName>
        <QuizDiv>
          {questions.map((question, index) => (
            <QuestionTable
              selected={question.id === currentQuestion}
              ans={
                !!(
                  answers &&
                  answers[index] &&
                  answers[index].userAnswers.length > 0
                )
              }
              onClick={() => setCurrentQuestion(question.id)}
              key={question.id}
            >
              <div
                style={{
                  width: '27px',
                  height: '18px',
                  fontSize: '14.4px',
                  textAlign: 'center'
                }}
              >
                {index + 1}
              </div>
            </QuestionTable>
          ))}
        </QuizDiv>
        <FinishDiv>
          <FinishButton onClick={handleFinish}>ЗАВЕРЩИТЬ ТЕСТ</FinishButton>
        </FinishDiv>
      </QuestionsPagination>
    </MainLayout>
  )
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      correctAnswers: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string
  }).isRequired
}

export default Questions
