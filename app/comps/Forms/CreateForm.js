import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLazyQuery, gql, useMutation } from '@apollo/client'
import { useAuth } from '../../context/useAuth'
import { Layout } from 'antd'

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 24px;
`
const MainName = styled.div`
  font-family: GT Walsheim;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #71bd65;
`
const MainForm = styled.div``

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
  height: 48px;
  background: #fbfbfb;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
`
const ButtonWrapper = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
`
const CancelButton = styled.button`
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  border-radius: 6px;
  color: #969b9e;
`
const SaveButton = styled.button`
  height: 40px;
  line-height: 40px;
  background: #fdd842;
  border-radius: 6px;
  color: #212428;
  margin-right: 8px;
`
const CreateForm = ({ onCancel, onCreate }) => {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  return (
    <MainLayout>
      <MainName>Создать тему обсуждение</MainName>
      <MainForm>
        <FormItemText>Название обсуждения</FormItemText>
        <StyledTextInput
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FormItemText>Текст сообщения</FormItemText>
        <textarea
          rows="4"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <ButtonWrapper>
          <CancelButton onClick={() => onCancel()}>Выход</CancelButton>
          <SaveButton
            onClick={() => onCreate({ name, description, user: user.id })}
          >
            Создать
          </SaveButton>
        </ButtonWrapper>
      </MainForm>
    </MainLayout>
  )
}

CreateForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default CreateForm
