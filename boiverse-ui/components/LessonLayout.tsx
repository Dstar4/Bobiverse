import {Col} from 'antd'
import React from 'react'
import {useCookies} from 'react-cookie'
import {useRouter} from 'next/router'
import Dashboard from './Dashboard'
import PageLayout from './Layout'

export default function LessonLayout({
  children,
}: {
  children: React.ReactElement
}) {
  const [cookies, setCookie, removeCookie] = useCookies(['bobiverse-token'])
  const router = useRouter()

  return (
    <PageLayout>
      <Col span={8}>
        <Dashboard />
      </Col>
      <Col span={16}>{children}</Col>
    </PageLayout>
  )
}
