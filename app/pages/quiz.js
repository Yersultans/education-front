import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import QuizContainer from '../comps/Quiz/Quiz.container'

const QuizPage = () => (
  <Fragment>
    <Helmet>
      <title>Тест|Education</title>
    </Helmet>
    <QuizContainer />
  </Fragment>
)

export default withMainLayout(QuizPage)
