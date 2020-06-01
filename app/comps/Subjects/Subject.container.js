import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { gql, useLazyQuery } from '@apollo/client'
import { Spin } from 'antd'
import LessonPanel from './LessonPanel'
import Content from './Content'

const MainContainer = styled.div`
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
  border-right: 1px solid rgba(0, 0, 0, 0.05);
`
const SubjectDiv = styled.div`
  padding: 16px;
`
const SubjectName = styled.div`
  font-size: 24px;
`
const SubjectButton = styled.button``
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
      name
      lessons {
        id
        name
        activities {
          id
          name
        }
      }
    }
  }
`
const SubjectContainer = () => {
  const router = useRouter()
  const { subjectId } = router.query
  const [getSubject, { loading, error, data }] = useLazyQuery(GET_SUBJECT)

  const [subject, setSubject] = useState(null)
  const [currentContent, setCurrentContent] = useState(null)

  useEffect(() => {
    if (subjectId) {
      getSubject({
        variables: { id: subjectId }
      })
    }
  }, [subjectId])
  useEffect(() => {
    if (data && data.subject) {
      setSubject(data.subject)
      setCurrentContent({ lessonId: data.subject.lessons[0].id })
    }
  }, [data, loading, error])

  const handleClickLesson = lessonId => {
    setCurrentContent({ lessonId })
  }

  const handleClickActivity = activityId => {
    setCurrentContent({ activityId })
  }

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
        <SubjectDiv>
          <SubjectName>{subject.name}</SubjectName>
          <SubjectButton>Тест по {subject.name}</SubjectButton>
        </SubjectDiv>
        <LessonsDiv>
          {subject &&
            subject.lessons.map(lesson => (
              <LessonPanel
                lesson={lesson}
                currentContent={currentContent}
                onClickLesson={handleClickLesson}
                onClickActivity={handleClickActivity}
              />
              // <LessonDiv
              //   onClick={() => {
              //     setCurrentContent({ lessonId: lesson.id })
              //   }}
              //   selected={lesson.id === currentContent.lessonId}
              // >
              //   {lesson.name}
              // </LessonDiv>
            ))}
        </LessonsDiv>
      </Sider>
      <ContentLayout>
        <Content currentContent={currentContent} />
      </ContentLayout>
    </MainContainer>
  )
}

export default SubjectContainer
