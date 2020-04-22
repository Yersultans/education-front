import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import PostCard from './PostCard'
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

const PostItemsContainer = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      name
      imageUrl
      user {
        id
        firstName
        lastName
      }
    }
  }
`
const PostsContainer = () => {
  const { loading, error, data } = useQuery(GET_POSTS)
  const router = useRouter()

  const onPostClick = post => {
    router.push({ pathname: '/post', query: { postId: post.id } })
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
        <MainTitle>Блог</MainTitle>
        <PostItemsContainer>
          {loading === false &&
            data &&
            data.posts &&
            data.posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
              />
            ))}
        </PostItemsContainer>
      </div>
    </div>
  )
}

export default PostsContainer
