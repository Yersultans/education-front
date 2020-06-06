import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { Spin, Tabs } from 'antd'
import YoutubePlayer from '../shared/YouTubePlayer'

const { TabPane } = Tabs

const ContentLayout = styled.div`
  width: 100%;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
`
const ContentName = styled.div`
  font-size: 32px;
`
const ContentDiv = styled.div``

const PlayerContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  border-radius: 8px;
`

const GET_LESSON = gql`
  query getLesson($id: ID!) {
    lesson(id: $id) {
      id
      name
      content
      videoUrl
    }
  }
`
const LessonContent = ({ lessonId }) => {
  const [lesson, setLesson] = useState()
  const { loading, error, data } = useQuery(GET_LESSON, {
    variables: { id: lessonId }
  })
  useEffect(() => {
    if (data && data.lesson) {
      setLesson(data.lesson)
    }
  }, [data])

  if (loading || !lesson)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>

  return (
    <ContentLayout>
      <ContentName>{lesson.name}</ContentName>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Теория" key="1">
          <ContentDiv
            dangerouslySetInnerHTML={{
              __html: lesson.content
            }}
          />
        </TabPane>
        <TabPane tab="Видео" key="2">
          <PlayerContainer>
            <YoutubePlayer url={lesson.videoUrl} />
          </PlayerContainer>
        </TabPane>
      </Tabs>
    </ContentLayout>
  )
}

LessonContent.propTypes = {
  lessonId: PropTypes.string.isRequired
}

export default LessonContent
