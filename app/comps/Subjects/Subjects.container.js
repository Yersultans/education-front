import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import SubjectCard from './SubjectCard'
import { Layout, Spin } from 'antd'

const MainLayout = styled.a`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`

const MainTitle = styled.div`
  font-family: GT Walsheim;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 40px;
  color: #333333;
`

const SubjectItemsContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const GET_SUBJECTS = gql`
  query getSubjects {
    subjects {
      id
      name
      imageUrl
      lessons {
        id
        name
      }
    }
  }
`

const SubjectsContainer = () => {
  const { loading, error, data } = useQuery(GET_SUBJECTS)
  const router = useRouter()

  const onSubjectClick = subject => {
    router.push({ pathname: '/subject', query: { subjectId: subject.id } })
  }

  if (error) {
    return <div>Some error from graphql</div>
  }
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  return (
    <div style={{ padding: '24px 0' }}>
      <div
        style={{
          padding: 24,
          margin: 0
        }}
      >
        <MainTitle>Предметы</MainTitle>
        <SubjectItemsContainer>
          {loading === false &&
            data &&
            data.subjects &&
            data.subjects.map(subject => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={() => onSubjectClick(subject)}
              />
            ))}
        </SubjectItemsContainer>
      </div>
    </div>
  )
}

export default SubjectsContainer
