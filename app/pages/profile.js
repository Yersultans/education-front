import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import ProfileContainer from '../comps/Profile/Profile.container'

const ProfilePage = () => (
  <Fragment>
    <Helmet>
      <title>Profile|Education</title>
    </Helmet>
    <ProfileContainer />
  </Fragment>
)

export default withMainLayout(ProfilePage)
