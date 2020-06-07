import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import { Spin, Form, Input, Button, Avatar } from 'antd'
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/useAuth'
import { useMessages } from '../../context/useMessages'

const { TextArea } = Input
const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      name
      imageUrl
      content
      user {
        id
        firstName
        lastName
      }
      createdAt
      messages {
        id
        content
        user {
          id
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`
const ADD_FORM_MESSAGE = gql`
  mutation addFormMessage($input: FormMessageInput) {
    addFormMessage(input: $input) {
      id
      content
      user {
        id
        firstName
        lastName
      }
      createdAt
    }
  }
`
const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $input: PostInput) {
    updatePost(id: $id, input: $input) {
      id
      name
      imageUrl
      content
      user {
        id
        firstName
        lastName
      }
      createdAt
      messages {
        id
        content
        user {
          id
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`
const MainContainer = styled.div`
  padding-top: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 32px;
`
const TitleRow = styled.div`
  height: 88px;
`
const PostTitle = styled.div`
  font-family: GT Walsheim;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
`
const PostInfo = styled.div`
  display: flex;
`

const PostAuthor = styled.div`
  margin-right: 16px;
`

const PostData = styled.div``

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  height: 100%;
`
const CommentContainer = styled.div`
  margin-top: 32px;
  width: 60%;
`

const CommentTitle = styled.div`
  font-size: 24px;
`
const Messages = styled.div``
const Message = styled.div`
  display: flex;
  margin-bottom: 16px;
`
const UserAvatar = styled.div`
  margin-right: 16px;
`
const MessageContent = styled.div`
  width: -webkit-fill-available;
`
const MainContent = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 9px 17px 19px;
`
const ContentInfo = styled.div`
  display: flex;
  font-size: 13px;
`
const MessageAuthor = styled.div``
const MessageData = styled.div``
const PostContainer = () => {
  const [text, setText] = useState('')
  const { displayMessage } = useMessages()
  const { user } = useAuth()
  const router = useRouter()
  const { postId } = router.query
  const [getPost, { loading, error, data }] = useLazyQuery(GET_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const [addFormMessage] = useMutation(ADD_FORM_MESSAGE, {
    update(cache, { data: { addFormMessage: formMessage } }) {
      let { post } = cache.readQuery({
        query: GET_POST,
        variables: { id: router.query.postId }
      })
      post = {
        id: post.id,
        name: post.name,
        imageUrl: post.imageUrl,
        user: post.user,
        content: post.content,
        createdAt: post.createdAt,
        messages: post.messages
          ? post.messages.concat([formMessage])
          : [formMessage]
      }
      const messages =
        post && post.messages ? post.messages.map(message => message.id) : []
      updatePost({ variables: { id: postId, input: { messages } } })
      cache.writeQuery({
        query: GET_POST,
        variables: { id: postId },
        data: {
          post
        }
      })
    }
  })
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (postId) {
      getPost({
        variables: { id: postId }
      })
    }
  }, [postId])

  useEffect(() => {
    if (data && data.post) setPost(data.post)
  }, [data, loading, error])

  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  const onSubmit = () => {
    addFormMessage({
      variables: { input: { content: text, post: postId, user: user.id } }
    })
    displayMessage({ type: 'notify', message: 'Ваш комментарий добавлен' })
    setText('')
  }
  return (
    <>
      {postId && post && (
        <MainContainer>
          <TitleRow>
            <PostTitle>{post.name}</PostTitle>
            <PostInfo>
              <PostAuthor>
                <UserOutlined />
                {post.user.firstName ? post.user.firstName : 'Ерсултан'}{' '}
                {post.user.lastName ? post.user.lastName : 'Калыбаев'}
              </PostAuthor>
              <PostData>
                <ClockCircleOutlined />
                {post.createdAt}
              </PostData>
            </PostInfo>
          </TitleRow>
          <ContentContainer
            dangerouslySetInnerHTML={{
              __html: post.content
            }}
          />
          <CommentContainer>
            <CommentTitle>Комментарии • {post.messages.length}</CommentTitle>
            <div>
              <Form.Item>
                <TextArea
                  rows={4}
                  onChange={e => setText(e.target.value)}
                  value={text}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={text === ''}
                  onClick={onSubmit}
                >
                  Отправить
                </Button>
              </Form.Item>
            </div>
            <Messages>
              {post.messages.map(message => (
                <Message>
                  <UserAvatar>
                    <Avatar icon={<UserOutlined />} />
                  </UserAvatar>
                  <MessageContent>
                    <MainContent>{message.content}</MainContent>
                    <ContentInfo>
                      <MessageAuthor>
                        <UserOutlined />
                        {message.user.firstName
                          ? message.user.firstName
                          : 'Ерсултан'}{' '}
                        {message.user.lastName
                          ? message.user.lastName
                          : 'Калыбаев'}
                      </MessageAuthor>
                      <MessageData>
                        <ClockCircleOutlined />
                        {message.createdAt
                          ? message.createdAt
                          : '25 декабря 2018 в 16:59'}
                      </MessageData>
                    </ContentInfo>
                  </MessageContent>
                </Message>
              ))}
            </Messages>
          </CommentContainer>
        </MainContainer>
      )}
    </>
  )
}
export default PostContainer
