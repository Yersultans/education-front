import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'

const GET_CONTENT = gql`
  query getContent($input: ContentInput) {
    content(input: $input) {
      content
      videoUrl
    }
  }
`
const ContentContainer = ({ currectContent }) => {
  const { loading, error, data } = useQuery(GET_CONTENT, {
    variables: { input: currectContent }
  })
}

ContentContainer.propTypes = {
  currentContent: PropTypes.shape({
    lessonId: PropTypes.string,
    activityId: PropTypes.string
  }).isRequired
}

export default ContentContainer
