import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import FormContainer from '../comps/Forms/Form.container'

const FormPage = () => (
  <Fragment>
    <Helmet>
      <title>Form|Education</title>
    </Helmet>
    <FormContainer />
  </Fragment>
)

export default withMainLayout(FormPage)
