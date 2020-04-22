import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import { Spin } from 'antd'

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
    }
  }
`
const MainContainer = styled.div`
  padding-top: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const TitleRow = styled.div`
  height: 88px;
  background: #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px;
`
const PostTitle = styled.div`
  font-family: GT Walsheim;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
`
const PostInfo = styled.div``

const PostAuthor = styled.div``

const PostData = styled.div``

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  height: 100%;
  padding: 64px 32px 0px 32px;
`
const CommentContainer = styled.div``

const PostContainer = () => {
  const router = useRouter()
  const { postId } = router.query
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: router.query.postId }
  })

  const [post, setPost] = useState(null)
  useEffect(() => {
    if (data && data.post) setPost(data.post)
  }, [data])

  if (loading || !post)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  if (error) return <div> some error </div>
  return (
    <MainContainer>
      <TitleRow>
        <PostTitle>{post.name}</PostTitle>
        <PostInfo>
          <PostAuthor>
            {post.user.firstName} {post.user.lastName}
          </PostAuthor>
          <PostData>{post.creatAt}</PostData>
        </PostInfo>
      </TitleRow>
      <ContentContainer
        dangerouslySetInnerHTML={{
          __html: post.content
        }}
      />
      <CommentContainer>Comment</CommentContainer>
    </MainContainer>
  )
}
export default PostContainer
