import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { useAuth } from '../../context/useAuth'
import { Avatar, Tabs, Spin, Progress, Statistic } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import HistoryContainer from '../Histories/Histories.container'

const { TabPane } = Tabs
const MainLayout = styled.div`
  display: flex;
  padding: 32px;
  width: 100%;
  height: 90vh;
  background: #fff;
`
const UserDiv = styled.div`
  display: flex;
`
const UserAvatar = styled.div`
  width: 257px;
  text-align: center;
`
const UserInfo = styled.div`
  padding-left: 16px;
  padding-right: 16px;
`
const UserFullName = styled.div`
  font-size: 24px;
`
const ContentDiv = styled.div``

const ProgressesDiv = styled.div``
const ProgressDiv = styled.div``
const ProgressName = styled.div`
  font-size: 24px;
`
const GET_RESULT = gql`
  query getResult($id: ID!) {
    progressByUser(id: $id) {
      total
      correct
      wrong
    }
  }
`
const ProfileContainer = () => {
  const { user } = useAuth()
  const { loading, error, data } = useQuery(GET_RESULT, {
    variables: { id: user && user.id }
  })
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return (
    <MainLayout>
      <UserDiv>
        <UserAvatar>
          <Avatar size={128} icon={<UserOutlined />} />
        </UserAvatar>
        <UserInfo>
          <UserFullName>
            {user && user.lastName ? user.lastName : 'Калыбаев'}{' '}
            {user && user.fistName ? user.fistName : 'Ерсултан'}
          </UserFullName>
          <ContentDiv>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Статистика" key="1">
                <ProgressesDiv>
                  <ProgressDiv>
                    <ProgressName>Количество правильных ответов:</ProgressName>
                    <Progress
                      type="circle"
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068'
                      }}
                      percent={
                        data &&
                        data.progressByUser &&
                        (data.progressByUser.correct /
                          data.progressByUser.total) *
                          100
                      }
                      format={percent =>
                        `${data.progressByUser.correct} / ${data.progressByUser.total}`
                      }
                    />
                  </ProgressDiv>
                </ProgressesDiv>
              </TabPane>
              <TabPane tab="История тестов" key="2">
                {user && <HistoryContainer user={user} />}
              </TabPane>
            </Tabs>
          </ContentDiv>
        </UserInfo>
      </UserDiv>
    </MainLayout>
  )
}

export default ProfileContainer
