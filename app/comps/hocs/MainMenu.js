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
    url: '/subjects',
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

const MainContainer = styled.div`
  display: flex;
`

const MainLogo = styled.div`
  float: left;
  line-height: 20px;
  padding: 20px;
  color: #71bd65;
  font-size: 30px;
`

const MenuItam = styled.div`
  padding: 0px 6px 0px 6px;
  margin-right: 20px;
  border-bottom-color: transparent;
  cursor: pointer;
  ${p =>
    p.selected &&
    `
    background: #71bd65;
  `};
`

const MenuItemText = styled.p`
  color: #000;
  ${p =>
    !p.selected &&
    `:hover {color: #71bd65;
  }`};
  ${p =>
    p.selected &&
    `
  color: #fff;
`};
`

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

  const renderLinks = pathname => {
    return linksByRole.map(({ url, label }) => (
      <Link
        key={label}
        href={{
          pathname: url,
          query: {},
          shallow: true
        }}
        passHref
      >
        <MenuItam selected={url === pathname}>
          <MenuItemText selected={url === pathname}>{label}</MenuItemText>
        </MenuItam>
      </Link>
    ))
  }

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
    <Layout.Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: '#fff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.25)'
      }}
    >
      <MainLogo>ProEnt</MainLogo>
      <MainContainer>{renderLinks(router.pathname)}</MainContainer>
      {/* <Menu mode="horizontal" defaultSelectedKeys={[router.pathname]}>
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
      </Menu> */}
      {user && user.username ? (
        <Dropdown overlay={menu}>
          <RigthColumn>
            <Avatar icon={<UserOutlined />} />
          </RigthColumn>
        </Dropdown>
      ) : (
        <RigthColumn>
          <div onClick={() => logout()} style={{ color: '#333333' }}>
            <LogoutOutlined /> Выйти
          </div>
        </RigthColumn>
      )}
    </Layout.Header>
  )
}

export default MainMenu
