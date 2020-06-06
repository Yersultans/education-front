import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import withMainLayout from '../comps/hocs/withMainLayout'
import PostContainer from '../comps/Posts/Post.container'

const PostPage = () => (
  <Fragment>
    <Helmet>
      <title>Пост|Education</title>
    </Helmet>
    <PostContainer />
  </Fragment>
)

export default withMainLayout(PostPage)
