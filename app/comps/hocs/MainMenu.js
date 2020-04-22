import React, { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ReactSVG } from 'react-svg'
import { useRouter } from 'next/router'
import Images from '../../theme/Images'
import { useAuth } from '../../context/useAuth'
import { Menu, Layout } from 'antd'

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

  return (
    <Layout.Header>
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
    </Layout.Header>
  )
}

export default MainMenu
