import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IndexContainer from '../comps/Default/Index.container'

const IndexPage = () => (
  <Fragment>
    <Helmet>
      <title>Пердметы|Education</title>
    </Helmet>
    <IndexContainer />
  </Fragment>
)

export default IndexPage
