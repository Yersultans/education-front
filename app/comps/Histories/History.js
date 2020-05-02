import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CheckOutlined } from '@ant-design/icons'

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
const Option = styled.div``
const QuestionsPagination = styled.div`
  width: 320px;
  height: fit-content;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
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
const QuestionTable = styled.div`
  ${p =>
    p.correct
      ? `background: #009788;
    border: 1px solid #008278;
    color: #ffffff;`
      : `
      background: #ff000061;
      border: 1px solid #008278;
      color: #ffffff;
      `}
  ${p =>
    p.selected &&
    `
      color: #1746DD;
      background: #e6f7ff;
      
    `}
  padding: 10px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  margin: 1px;
  :hover {
    color: #1746dd;
    background: #e6f7ff;
  }
`
const History = ({ history }) => {
  const [currentQuestion, setCurrentQuestion] = useState(
    history.questions[0].question.id
  )

  return (
    <MainLayout>
      <QuestionsDiv>
        {history &&
          history.questions.map(
            (quest, index) =>
              currentQuestion === quest.question.id && (
                <Question key={quest.id}>
                  <QuestionTitle
                    dangerouslySetInnerHTML={{
                      __html: `${index + 1}. ${quest.question.text}`
                    }}
                  />
                  <Options>
                    {quest.question.options.map(option => (
                      <Option>
                        {option}
                        {quest.question.correctAnswers.includes(option) && (
                          <CheckOutlined />
                        )}
                      </Option>
                    ))}
                  </Options>
                </Question>
              )
          )}
      </QuestionsDiv>
      <QuestionsPagination>
        <QuestionName>
          Результат: {history.correctAnswers} / {history.total}
        </QuestionName>
        <QuizDiv>
          {history.questions.map((quest, index) => (
            <QuestionTable
              selected={quest.question.id === currentQuestion}
              correct={quest.isCorrect}
              key={quest.id}
              onClick={() => setCurrentQuestion(quest.question.id)}
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
      </QuestionsPagination>
    </MainLayout>
  )
}

History.propTypes = {
  history: PropTypes.shape({
    id: PropTypes.string,
    total: PropTypes.number,
    correctAnswers: PropTypes.number,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        isCorrect: PropTypes.bool,
        userAnswers: PropTypes.arrayOf(PropTypes.string),
        question: PropTypes.shape({
          id: PropTypes.string,
          text: PropTypes.string,
          correctAnswers: PropTypes.arrayOf(PropTypes.string),
          options: PropTypes.arrayOf(PropTypes.string)
        })
      })
    )
  }).isRequired
}

export default History
