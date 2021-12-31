import {Layout, Menu, Button} from 'antd'
import React from 'react'
import Link from 'next/link'
import {useCookies} from 'react-cookie'
import {useRouter} from 'next/router'
import {SiteContent} from '../styles/layout.styles'

const {Header, Footer, Content} = Layout

export default function PageLayout({children}: {children: React.ReactElement}) {
  const [cookies, setCookie, removeCookie] = useCookies(['bobiverse-token'])
  const router = useRouter()

  return (
    <Layout>
      <Header>
        {/* <NavLogo /> */}
        {/* <h4>Bobiverse</h4> */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="lessons">
            <Link href="/lessons">
              <a>Lessons</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="guppy">
            <Link href="/guppy">
              <a>Guppy</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="register">
            <Link href="/auth/register">
              <a>Register</a>
            </Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            onClick={() => {
              removeCookie('bobiverse-token')
              router.push('/auth/login')
            }}
          >
            Logout
          </Menu.Item>
          {/* <Button onClick={() => removeCookie}>Logout</Button> */}
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{padding: '0 50px', margin: '16px 0', minHeight: '80vh'}}
        >
          <SiteContent>{children}</SiteContent>
        </Content>
      </Layout>
      <Footer style={{textAlign: 'center'}}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}
