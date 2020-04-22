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
`

const PostImage = styled.img`
  width: 328px;
  height: 180px;
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

const PostCard = ({ post, onClick }) => {
  return (
    <MainContainer onClick={onClick}>
      <PostImage src={post.imageUrl} />
      <TitleRow>
        <TitleText>{post.name}</TitleText>
      </TitleRow>
    </MainContainer>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    activitiesNumber: PropTypes.number,
    finishedActivitiesNumber: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
}

PostCard.defaultProps = {
  onClick: null
}

export default PostCard
