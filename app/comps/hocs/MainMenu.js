import React, { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import { useRouter } from 'next/router'
import Images from '../../theme/Images'
import { useAuth } from '../../context/useAuth'
import { Menu, Layout, Dropdown, Avatar } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

const links = [
  {
    label: 'Предметы',
    url: '/',
    iconUrl: '',
    dot: false,
    allowedUsers: ['user', 'admin']
  },
  {
    label: 'Форум',
    url: '/forms',
    iconUrl: '',
    dot: false,
    allowedUsers: ['user', 'admin']
  },
  {
    label: 'Блог',
    url: '/posts',
    iconUrl: '',
    dot: false,
    allowedUsers: ['user', 'admin']
  }
]

const RigthColumn = styled.div``

function MainMenu() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { checkUserIsLoggedIn } = useAuth()

  useEffect(() => {
    if (!checkUserIsLoggedIn()) {
      router.push('/login')
    }
  })
  const linksByRole = links.filter(
    link => user && link.allowedUsers.includes(user.role)
  )

  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          router.push({ pathname: '/profile', query: {} })
        }}
      >
        <UserOutlined /> Профиль
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => logout()}>
        <LogoutOutlined /> Выйти
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[router.pathname]}
      >
        {linksByRole.map(({ url, label }) => (
          <Menu.Item key={url}>
            <Link
              key={label}
              href={{
                pathname: url,
                query: {},
                shallow: true
              }}
              passHref
            >
              {label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
      {user && user.username ? (
        <RigthColumn>
          <Dropdown overlay={menu}>
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </RigthColumn>
      ) : (
        <RigthColumn>
          <div onClick={() => logout()} style={{ color: '#fff' }}>
            <LogoutOutlined /> Выйти
          </div>
        </RigthColumn>
      )}
    </Layout.Header>
  )
}

export default MainMenu
