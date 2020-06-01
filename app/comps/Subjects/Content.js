import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import LessonContent from './LessonContent'
import ActivityContent from './ActivityContent'

const Content = ({ currentContent }) => {
  if (currentContent.lessonId) {
    return <LessonContent lessonId={currentContent.lessonId} />
  }
  return <ActivityContent activityId={currentContent.activityId} />
}

Content.propTypes = {
  currentContent: PropTypes.shape({
    lessonId: PropTypes.string,
    activityId: PropTypes.string
  }).isRequired
}

export default Content
