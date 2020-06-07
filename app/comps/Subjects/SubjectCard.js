import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MainContainer = styled.div`
  width: 328px;
  height: 240px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 8px;
  margin-top: 32px;
  margin-right: 32px;
  border: 1px solid rgba(0, 0, 0, 0.25);
`

const SubjectImage = styled.img`
  width: 328px;
  height: 80px;
  border-radius: 8px 8px 0px 0px;
  object-fit: cover;
`

const TitleRow = styled.div`
  width: 100%;
  height: 40px;
  padding: 16px 16px 0px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const TitleText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const Description = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 8px 16px 16px 16px;
  box-sizing: border-box;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: rgba(33, 36, 40, 0.8);
`

const SubjectCard = ({ subject, onClick }) => {
  return (
    <MainContainer onClick={onClick}>
      <SubjectImage src={subject.imageUrl} />
      <TitleRow>
        <TitleText>{subject.name}</TitleText>
      </TitleRow>
    </MainContainer>
  )
}

SubjectCard.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default SubjectCard
