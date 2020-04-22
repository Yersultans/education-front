import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'

const MainContainer = styled.div`
  padding-top: 16px;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  flex-direction: row;
  background: #fff;
`
const Sider = styled.div`
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
`
const LessonsDiv = styled.div`
  width: 100%;
  overflow: auto;
`
const LessonDiv = styled.div`
  ${p =>
    p.selected &&
    `
    color: #1746DD;
    background: #e6f7ff;
    
  `}
  cursor: pointer;
  padding: 16px;
`

const ContentLayout = styled.div`
  width: 100%;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`
const GET_SUBJECT = gql`
  query getSubject($id: ID!) {
    subject(id: $id) {
      id
      lessons {
        id
        name
        content
      }
    }
  }
`
const SubjectContainer = () => {
  const router = useRouter()
  const { subjectId } = router.query
  const { loading, error, data } = useQuery(GET_SUBJECT, {
    variables: { id: router.query.subjectId }
  })

  const [subject, setSubject] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  useEffect(() => {
    if (data && data.subject) {
      setSubject(data.subject)
      setCurrentLesson(data.subject.lessons[0])
    }
  }, [data])

  if (loading || !subject)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return (
    <MainContainer>
      <Sider>
        <LessonsDiv>
          {subject &&
            subject.lessons.map(lesson => (
              <LessonDiv
                onClick={() => {
                  setCurrentLesson(lesson)
                }}
                selected={lesson.id === currentLesson.id}
              >
                {lesson.name}
              </LessonDiv>
            ))}
        </LessonsDiv>
      </Sider>
      <ContentLayout
        dangerouslySetInnerHTML={{
          __html: currentLesson.content
        }}
      />
    </MainContainer>
  )
}

export default SubjectContainer
