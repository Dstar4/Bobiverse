import styled from '@emotion/styled'
import { Row, Col } from 'antd'
import { useCookies } from 'react-cookie'
import PageLayout from '../components/Layout'

export default function Account() {
  const [cookies] = useCookies(['bobiverse-token'])
  const token = cookies['bobiverse-token']
  return (
    <PageLayout>
      <Row justify='center' align='top' style={ { minHeight: '80vh' } }>
        <Col >
          <h1>Account Settings</h1>
          <p>
            <strong>User Token: </strong>
            { cookies['bobiverse-token'] }
          </p>
        </Col>
      </Row>
    </PageLayout>
  )
}