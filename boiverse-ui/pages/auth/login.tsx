import { UserOutlined, LockOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Row, Col, Form, Input, Button, Checkbox } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import PageLayout from '../../components/Layout'

const baseUrl = process.env.BACKEND_URL

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['bobiverse-token'])
  const router = useRouter()

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values)

    const response = await axios.request({
      url: `${baseUrl}/auth/login`,
      method: 'POST',
      data: { email: values.email, password: values.password }
    })
    setCookie('bobiverse-token', `Bearer ${response.data.token}`, { path: '/' })
    router.push('/lessons')
  }
  return (
    <PageLayout>
      <Row justify='center' align='middle' style={{ minHeight: '80vh' }}>
        <Col xs={24} sm={18} lg={12}>
          <Form name='normal_login' initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name='email'
              rules={[
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your email!' }
              ]}>
              <Input prefix={<UserOutlined />} placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type='password' placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <ForgotLink href=''>Forgot password</ForgotLink>
            </Form.Item>

            <Form.Item>
              <LoginSubmit type='primary' htmlType='submit'>
                Log in
              </LoginSubmit>
              Or <a href='/auth/register'>register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}

const ForgotLink = styled.a`
  float: right;
`

const LoginSubmit = styled(Button)`
  width: 100%;
`
