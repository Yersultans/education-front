import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import SubjectContainer from '../comps/Subjects/Subject.container'

const SubjectPage = () => (
  <Fragment>
    <Helmet>
      <title>Subject|Education</title>
    </Helmet>
    <SubjectContainer />
  </Fragment>
)

export default withMainLayout(SubjectPage)
