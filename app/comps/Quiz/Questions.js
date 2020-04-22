import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainLayout = styled.div``
const QuestionsDiv = styled.div``
const Question = styled.div``
const QuestionTitle = styled.div`
  display: flex;
`
const Options = styled.div``
const OptionGroup = styled.div``
const OptionButton = styled.div``
const QuestionsPagination = styled.div``

const Questions = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0].id)
  return (
    <MainLayout>
      <QuestionsDiv>
        {questions.map(
          (question, index) =>
            currentQuestion === question.id && (
              <Question>
                <QuestionTitle
                  dangerouslySetInnerHTML={{
                    __html: `${index + 1}. ${question.text}`
                  }}
                />
                <Options>
                  <OptionGroup>
                    {question.options.map(option => (
                      <OptionButton>{option}</OptionButton>
                    ))}
                  </OptionGroup>
                </Options>
              </Question>
            )
        )}
      </QuestionsDiv>
      <QuestionsPagination />
    </MainLayout>
  )
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
}

export default Questions
