import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { Spin, Tabs, Modal, Button } from 'antd'
import YoutubePlayer from '../shared/YouTubePlayer'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

const { TabPane } = Tabs

const ContentLayout = styled.div`
  width: 100%;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
`
const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const GET_ACTIVITY = gql`
  query getActivity($id: ID!) {
    activity(id: $id) {
      id
      name
      content
      videoUrl
    }
  }
`
const ActivityContent = ({ activityId }) => {
  const router = useRouter()
  const [activity, setActivity] = useState()
  const { loading, error, data } = useQuery(GET_ACTIVITY, {
    variables: { id: activityId }
  })
  useEffect(() => {
    if (data && data.activity) {
      setActivity(data.activity)
    }
  }, [data])

  if (loading || !activity)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>

  const handleTestClick = () => {
    confirm({
      title: `Вы уверены что хотите пройти тест по Разделу ${activity.name}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      cancelText: 'Нет',
      onOk() {
        router.push({ pathname: '/quiz', query: { activityId: activity.id } })
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  return (
    <ContentLayout>
      <ContentTitle>
        <ContentName>{activity.name}</ContentName>
        <Button onClick={handleTestClick}>Тест</Button>
      </ContentTitle>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Теория" key="1">
          <ContentDiv
            dangerouslySetInnerHTML={{
              __html: activity.content
            }}
          />
        </TabPane>
        <TabPane tab="Видео" key="2">
          <PlayerContainer>
            <YoutubePlayer url={activity.videoUrl} />
          </PlayerContainer>
        </TabPane>
      </Tabs>
    </ContentLayout>
  )
}

ActivityContent.propTypes = {
  activityId: PropTypes.string.isRequired
}

export default ActivityContent
