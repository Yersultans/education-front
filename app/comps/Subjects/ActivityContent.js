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

  return (
    <ContentLayout>
      <ContentName>{activity.name}</ContentName>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Теория" key="1">
          <ContentDiv
            dangerouslySetInnerHTML={{
              __html: activity.content
            }}
          />
        </TabPane>
        <TabPane tab="Видео" key="2">
          sadada
        </TabPane>
      </Tabs>
    </ContentLayout>
  )
}

ActivityContent.propTypes = {
  activityId: PropTypes.string.isRequired
}

export default ActivityContent
