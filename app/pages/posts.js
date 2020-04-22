import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import PostsContainer from '../comps/Posts/Posts.container'

const PostsPage = () => (
  <Fragment>
    <Helmet>
      <title>Posts|Education</title>
    </Helmet>
    <PostsContainer />
  </Fragment>
)

export default withMainLayout(PostsPage)
