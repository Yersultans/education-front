import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { Spin, Tabs } from 'antd'

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
        <TabPane tab="Статистика" key="1">
          <ContentDiv
            dangerouslySetInnerHTML={{
              __html: lesson.content
            }}
          />
        </TabPane>
        <TabPane tab="История тестов" key="2">
          sadada
        </TabPane>
      </Tabs>
    </ContentLayout>
  )
}

LessonContent.propTypes = {
  lessonId: PropTypes.string.isRequired
}

export default LessonContent
