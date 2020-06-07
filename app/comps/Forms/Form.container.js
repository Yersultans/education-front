import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client'
import { Spin, Form, Input, Button, Avatar } from 'antd'
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/useAuth'
import { useMessages } from '../../context/useMessages'

const { TextArea } = Input
const GET_FORM = gql`
  query getForm($id: ID!) {
    form(id: $id) {
      id
      name
      description
      user {
        id
        firstName
        lastName
      }
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
      createdAt
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
const UPDATE_FORM = gql`
  mutation updateForm($id: ID!, $input: FormInput) {
    updateForm(id: $id, input: $input) {
      id
      name
      description
      user {
        id
        firstName
        lastName
      }
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
      createdAt
    }
  }
`
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 32px;
`
const TitleRow = styled.div`
  height: 88px;
  width: 60%;
  align-items: center;
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
  font-size: 13px;
`

const PostAuthor = styled.div`
  margin-right: 8px;
`

const PostData = styled.div``

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  width: 60%;
`
const FormDescription = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 9px 17px 19px;
`
const CommentContainer = styled.div`
  width: 60%;
`
const CommentTitle = styled.div`
  font-size: 17px;
`
const Messages = styled.div``
const Message = styled.div`
  display: flex;
  margin-bottom: 16px;
`
const UserAvatar = styled.div`
  margin-right: 16px;
  margin-top: 16px;
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

const FormContainer = () => {
  const [text, setText] = useState('')
  const { displayMessage } = useMessages()
  const { user } = useAuth()
  const router = useRouter()
  const { formId } = router.query
  const [getForm, { loading, error, data }] = useLazyQuery(GET_FORM)
  const [updateForm] = useMutation(UPDATE_FORM)
  const [addFormMessage] = useMutation(ADD_FORM_MESSAGE, {
    update(cache, { data: { addFormMessage: formMessage } }) {
      let { form } = cache.readQuery({
        query: GET_FORM,
        variables: { id: router.query.formId }
      })
      form = {
        id: form.id,
        name: form.name,
        description: form.description,
        user: form.user,
        createdAt: form.createdAt,
        messages: form.messages
          ? form.messages.concat([formMessage])
          : [formMessage]
      }
      const messages =
        form && form.messages ? form.messages.map(message => message.id) : []
      updateForm({ variables: { id: formId, input: { messages } } })
      cache.writeQuery({
        query: GET_FORM,
        variables: { id: formId },
        data: {
          form
        }
      })
    }
  })

  const [form, setForm] = useState(null)

  useEffect(() => {
    if (formId) {
      getForm({
        variables: { id: formId }
      })
    }
  }, [formId])

  useEffect(() => {
    if (data && data.form && !error && !loading) setForm(data.form)
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
      variables: { input: { content: text, form: formId, user: user.id } }
    })
    displayMessage({ type: 'notify', message: 'Ваш комментарий добавлен' })
    setText('')
  }
  return (
    <>
      {formId && form && (
        <MainContainer>
          <TitleRow>
            <PostTitle>{form.name}</PostTitle>
            <PostInfo>
              <PostAuthor>
                <UserOutlined />
                {form.user.firstName ? form.user.firstName : 'Ерсултан'}{' '}
                {form.user.lastName ? form.user.lastName : 'Калыбаев'}
              </PostAuthor>
              <PostData>
                <ClockCircleOutlined />
                {form.createdAt ? form.createdAt : '25 декабря 2018 в 16:59'}
              </PostData>
            </PostInfo>
          </TitleRow>
          <ContentContainer>
            <FormDescription>{form.description}</FormDescription>
          </ContentContainer>
          <CommentContainer>
            <CommentTitle>Комментарии • {form.messages.length}</CommentTitle>
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
              {form.messages &&
                form.messages.map(message => (
                  <Message>
                    <UserAvatar>
                      <Avatar icon={<UserOutlined />} />
                    </UserAvatar>
                    <MessageContent>
                      <MainContent>{message.content}</MainContent>
                      <ContentInfo>
                        <MessageAuthor>
                          <UserOutlined />
                          {message.user && message.user.firstName
                            ? message.user.firstName
                            : 'Ерсултан'}{' '}
                          {message.user && message.user.lastName
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
export default FormContainer
