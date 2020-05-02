import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import HistoryContainer from '../comps/Histories/History.container'

const HistoryPage = () => (
  <Fragment>
    <Helmet>
      <title>Post|Education</title>
    </Helmet>
    <HistoryContainer />
  </Fragment>
)

export default withMainLayout(HistoryPage)
