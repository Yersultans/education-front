import React from 'react'
import styled from 'styled-components'
import MainMenu from './MainMenu'
import { Layout } from 'antd'

const MainLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  overflow-x: hidden;
`

const MainContent = styled.div`
  margin-top: 64px;
  display: flex;
  width: 100%;
  max-width: 1088px;
  box-sizing: border-box;
  height: 100%;
`

const withMainLayout = Page => {
  return () => (
    <Layout>
      <MainMenu />
      <Layout.Content
        style={{
          background: '#fff',
          width: '100%',
          minHeight: '77.9vh',
          height: '100%'
        }}
      >
        <Page />
      </Layout.Content>
      <Layout.Footer
        style={{
          background: '#fff',
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.25)'
        }}
      >
        ProEnt © 2020 создано Ерсултаном, Жанатом и Адильжаном
      </Layout.Footer>
    </Layout>
  )
}

export default withMainLayout
