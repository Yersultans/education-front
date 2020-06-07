import React from 'react'
import styled from 'styled-components'
import { useLazyQuery, gql, useMutation } from '@apollo/client'
import { useAuth } from '../../context/useAuth'
import { useMessages } from '../../context/useMessages'
import { Avatar, Tabs, Spin, Progress } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import HistoryContainer from '../Histories/Histories.container'
import ImageUpload from '../shared/ImageUpload'

const { TabPane } = Tabs
const MainLayout = styled.div`
  display: flex;
  padding: 32px;
  width: 100%;
  min-height: 90vh;
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

const FormItemText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: rgba(51, 51, 51, 0.6);
  margin-top: 24px;
  margin-bottom: 16px;
`

const StyledTextInput = styled.input`
  min-width: 328px;
  height: 48px;
  background: #fbfbfb;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
`

const StyledSubmitButton = styled.button`
  margin-top: 56px;
  height: 48px;
  background: #fdd842;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #212428;
`

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

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $input: UserInput) {
    updateUser(id: $id, input: $input) {
      id
      username
      role
      firstName
      lastName
      imageUrl
    }
  }
`

const ProfileContainer = () => {
  const { user } = useAuth()
  const [result, setResult] = React.useState(null)
  const [username, setUsername] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [repeat, setRepeat] = React.useState('')
  const [getResult, { loading, error, data }] = useLazyQuery(GET_RESULT)
  const { displayMessage } = useMessages()

  const [updateUser] = useMutation(UPDATE_USER)

  React.useEffect(() => {
    if (user) {
      getResult({ variables: { id: user.id } })
      setUsername(user.username)
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setImageUrl(user.imageUrl)
    }
  }, [user])

  React.useEffect(() => {
    if (data && data.progressByUser) setResult(data.progressByUser)
  }, [data, loading, error])

  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>

  const handleImageUpdate = imageURL => {
    setImageUrl(imageURL)
    console.log('imageUpload', imageURL)
  }

  const handleFormSubmit = () => {
    if (password !== repeat) {
      displayMessage({ type: 'error', message: 'пароли не идентичны' })
    } else {
      updateUser({
        variables: {
          id: user.id,
          input: { username, lastName, firstName, imageUrl }
        }
      })
    }
  }
  return (
    <MainLayout>
      <UserDiv>
        <UserAvatar>
          <Avatar size={128} src={user && user.imageUrl} />
        </UserAvatar>
        <UserInfo>
          <UserFullName>
            {user && user.lastName ? user.lastName : 'Калыбаев'}{' '}
            {user && user.fistName ? user.fistName : 'Ерсултан'}
          </UserFullName>
          <ContentDiv>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Информция" key="1">
                <FormItemText>Username</FormItemText>
                <StyledTextInput
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <FormItemText>Имя</FormItemText>
                <StyledTextInput
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <FormItemText>Фамилия</FormItemText>
                <StyledTextInput
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
                <FormItemText>Пароль</FormItemText>
                <StyledTextInput
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                  }}
                />
                <FormItemText>Повтарите Пароль</FormItemText>
                <StyledTextInput
                  type="password"
                  value={repeat}
                  onChange={e => setRepeat(e.target.value)}
                />
                <FormItemText>Фото</FormItemText>
                <Avatar
                  style={{ marginRight: 10 }}
                  size="xlarge"
                  src={imageUrl}
                />
                <ImageUpload onUpdate={handleImageUpdate} />
                <StyledSubmitButton onClick={handleFormSubmit}>
                  Войти
                </StyledSubmitButton>
              </TabPane>
              <TabPane tab="Статистика" key="2">
                <ProgressesDiv>
                  <ProgressDiv>
                    <ProgressName>Количество правильных ответов:</ProgressName>
                    <Progress
                      type="circle"
                      strokeColor={{
                        '0%': '#71bd65',
                        '100%': '#7aea8c'
                      }}
                      percent={result && (result.correct / result.total) * 100}
                      format={percent => `${result.correct} / ${result.total}`}
                    />
                  </ProgressDiv>
                </ProgressesDiv>
              </TabPane>
              <TabPane tab="История тестов" key="3">
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
