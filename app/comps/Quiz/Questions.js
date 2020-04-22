import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Radio } from 'antd'

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
const Options = styled.div``
const OptionGroup = styled(Radio.Group)``
const OptionButton = styled(Radio)`
  display: block;
`
const QuestionsPagination = styled.div`
  width: 320px;
  height: fit-content;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
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
  border: 1px solid rgba(0, 0, 0, 0.05);
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
const Questions = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id)
  const [answers, setAswers] = useState([])
  const handleRadioChange = (question, answer, index) => {
    const isCorrect = questions[index].correctAnswers[0] === answer
    if (answers && answers[index]) {
      setAswers(
        answers.map((ans, key) => {
          return key === index
            ? { questionId: question.id, userAnswer: answer, isCorrect }
            : ans
        })
      )
    } else {
      const newAnswers = answers
        ? answers.concat([
            { questionId: question.id, userAnswer: answer, isCorrect }
          ])
        : [{ questionId: question.id, userAnswer: answer, isCorrect }]
      setAswers(newAnswers)
    }
  }
  const handleFinish = () => {
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
                  <OptionGroup
                    value={
                      answers && answers[index] && answers[index].userAnswer
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
              ans={!!(answers && answers[index])}
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
  ).isRequired
}

export default Questions
