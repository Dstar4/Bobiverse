import { Form, Input, Row, Col, Button } from 'antd'
import PageLayout from '../../components/Layout'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Register() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['bobiverse-token'])

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values)
    const response = await axios.request({
      url: `${baseUrl}/users/register`,
      method: 'POST',
      data: { email: values.email, password: values.password, nickname: values.nickname }
    })
    setCookie('bobiverse-token', `Bearer ${response.data.token}`, { path: '/' })
    router.push('/auth/login')
  }

  return (
    <PageLayout>
      <Row justify='center' align='middle' style={{ minHeight: '80vh' }}>
        <Col xs={24} lg={16}>
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            initialValues={{}}
            scrollToFirstError>
            <Form.Item
              name='email'
              label='E-mail'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}
              hasFeedback>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    )
                  }
                })
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='nickname'
              label='Nickname'
              tooltip='What do you want others to call you?'
              rules={[
                { required: true, message: 'Please input your nickname!', whitespace: true }
              ]}>
              <Input />
            </Form.Item>

            {/* <Form.Item
              name='agreement'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
                }
              ]}
              {...tailFormItemLayout}></Form.Item> */}
            {/* <Form.Item {...tailFormItemLayout}> */}
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
            {/* </Form.Item> */}
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
