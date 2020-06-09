import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CheckCircleOutlined } from '@ant-design/icons'

const MainContainer = styled.div`
  margin-buttom: 16px;
`
const Container = styled.div``

const PanelContainer = styled.div`
  width: 100%;
  display: ${p => (!p.display ? 'none' : 'block')};
  height: 100%;
  padding-left: 8px;
  background: #e6f7ff;
`
const ActivityContainer = styled.div``

const LessonText = styled.div`
  ${p =>
    p.selected &&
    `
color: #71bd65;
cursor: pointer;

`}
  padding: 8px 2px 2px 16px;
`
const ActivityText = styled.div`
  ${p =>
    p.selected &&
    `
  color: #71bd65;
  
`}
  font-size: 15px;
  cursor: pointer;
  padding: 2px 0px 2px 16px;
`

const LessonPanel = ({
  lesson,
  currentContent,
  onClickLesson,
  onClickActivity
}) => {
  const { lessonId, activityId } = currentContent
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    if(lessonId){
      setDisplay(lessonId === lesson.id)
    } 
  },[lessonId, activityId])

  return (
    <MainContainer>
      <Container>
        <LessonText
          selected={lessonId === lesson.id }
          onClick={() => onClickLesson(lesson.id)}
        >
          {lesson.name}
        </LessonText>
      </Container>
      <PanelContainer display={display}>
        {lesson.activities.map(activityData =>
          activityData ? (
            <ActivityText
              selected={activityId === activityData.id}
              onClick={() => onClickActivity(activityData.id)}
            >
              {activityData.name}
            </ActivityText>
          ) : (
            <div>Null activity </div>
          )
        )}
      </PanelContainer>
    </MainContainer>
  )
}
LessonPanel.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    activities: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  currentContent: PropTypes.shape({
    lessonId: PropTypes.string,
    activityId: PropTypes.string
  }).isRequired,
  onClickLesson: PropTypes.func.isRequired,
  onClickActivity: PropTypes.func.isRequired
}
export default LessonPanel
