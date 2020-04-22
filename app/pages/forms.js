import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import FormsContainer from '../comps/Forms/Forms.container'

const FormsPage = () => (
  <Fragment>
    <Helmet>
      <title>Forms|Education</title>
    </Helmet>
    <FormsContainer />
  </Fragment>
)

export default withMainLayout(FormsPage)
