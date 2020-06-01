import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CreateForm from './CreateForm'
import { useMessages } from '../../context/useMessages'

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 24px;
`

const MainTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`
const MainName = styled.div`
  font-family: GT Walsheim;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #333333;
`
const AddRow = styled.div``
const AddFormButton = styled.button`
  line-height: 40px;
  background: #6f64e9;
  border-radius: 6px;
  color: #fff;
`
const FormsDiv = styled.div``
const FormDiv = styled.div`
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  background: #fff;
  margin-bottom: 8px;
`
const FormTitel = styled.div``
const FormName = styled.div`
  color: #333333;
`
const FormDate = styled.div``
const FormAuthor = styled.div``

const GET_FORMS = gql`
  query getForms {
    forms {
      id
      name
      description
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`
const ADD_FORM = gql`
  mutation addForm($input: FormInput) {
    addForm(input: $input) {
      id
      name
      description
      createdAt
      user {
        id
        firstName
        lastName
      }
    }
  }
`
const FromsContainer = () => {
  const { displayMessage } = useMessages()
  const [modalView, setModalView] = useState('list')
  const [forms, setForms] = useState([])
  const { loading, error, data } = useQuery(GET_FORMS)
  const router = useRouter()
  const [addForm] = useMutation(ADD_FORM, {
    update(cache, { data: { addForm: form } }) {
      const { forms } = cache.readQuery({ query: GET_FORMS })
      cache.writeQuery({
        query: GET_FORMS,
        data: { forms: forms.concat([form]) }
      })
    }
  })

  React.useEffect(() => {
    if (data && data.forms) {
      setForms(
        data.forms.map(form => {
          return {
            id: form.id,
            name: form.name,
            description: form.description,
            user: form.user,
            createdAt: new Date(form.createdAt)
          }
        })
      )
    }
  }, [data, loading, error])

  const onFormClick = form => {
    router.push({ pathname: '/form', query: { formId: form.id } })
  }

  const handleCancelClick = () => {
    setModalView('list')
  }
  const handleFormCreate = value => {
    addForm({ variables: { input: value } })
    setModalView('list')
  }
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) {
    return <div>Some error from graphq</div>
  }

  return (
    <>
      {modalView === 'list' && (
        <MainLayout>
          <MainTitle>
            <MainName>Форум</MainName>
            <AddRow>
              <AddFormButton
                onClick={() => {
                  setModalView('create')
                }}
              >
                <PlusOutlined /> Создать тему
              </AddFormButton>
            </AddRow>
          </MainTitle>
          <FormsDiv>
            {forms &&
              forms.map(form => (
                <FormDiv>
                  <FormTitel>
                    <FormName
                      onClick={() => {
                        onFormClick(form)
                      }}
                    >
                      {form.name}
                    </FormName>
                    <FormDate>{form.createdAt.toString()}</FormDate>
                  </FormTitel>
                  <FormAuthor>
                    {form.user.firstName} {form.user.lastName}
                  </FormAuthor>
                </FormDiv>
              ))}
          </FormsDiv>
        </MainLayout>
      )}
      {modalView === 'create' && (
        <CreateForm onCancel={handleCancelClick} onCreate={handleFormCreate} />
      )}
    </>
  )
}
export default FromsContainer
