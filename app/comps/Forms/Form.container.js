import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Spin, Form, Input, Button } from 'antd'
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '../../context/useAuth'

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
      }
    }
  }
`
const MainContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 32px;
`
const TitleRow = styled.div`
  height: 88px;
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
`
const FormDescription = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 9px 17px 19px;
`
const CommentContainer = styled.div``
const CommentTitle = styled.div`
  font-size: 17px;
`

const FormContainer = () => {
  const [text, setText] = useState('')
  const { user } = useAuth()
  const router = useRouter()
  const { formId } = router.query
  const { loading, error, data } = useQuery(GET_FORM, {
    variables: { id: router.query.formId }
  })
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
    if (data && data.form) setForm(data.form)
  }, [data])

  if (loading || !form)
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
    setText('')
  }
  return (
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
            {form.creatAt ? form.creatAt : '25 декабря 2018 в 16:59'}
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
      </CommentContainer>
    </MainContainer>
  )
}
export default FormContainer
