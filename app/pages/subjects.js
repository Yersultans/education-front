import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import SubjectsContainer from '../comps/Subjects/Subjects.container'

const SubjectsPage = () => (
  <Fragment>
    <Helmet>
      <title>Пердметы|Education</title>
    </Helmet>
    <SubjectsContainer />
  </Fragment>
)

export default withMainLayout(SubjectsPage)
