import styled from '@emotion/styled'
import PageLayout from '../../components/Layout'
import { useCookies } from 'react-cookie'
import { Input, Tooltip, Button } from 'antd'
import { CopyOutlined } from '@ant-design/icons';
import { Typography, Space, Divider, List, Col, Row } from 'antd';
import LessonLayout from '../../components/LessonLayout';
const { Text, Link, Title } = Typography;

function Lessons({ lesson }: { lesson: any }) {
  const [cookies] = useCookies(['bobiverse-token'])
  const token = cookies['bobiverse-token']

  const data = [
    `Locate your api key and secret inside your account settings.`,
    `Review the documentation for authentication "LINK HERE"`,
    `Try a request with curl or another request tool like Postman "POSTMAN LINK"`,
    `The all requests will need the token attached to the headers with the key "Authorization"`,
    `You will need to attach the api key to the url like this "https://api.bobiverse-learn.com/bobs"`,
  ]

  return (
    <LessonLayout>
      <Space direction="vertical" style={ { width: '100%' } }>
        <Row justify='space-between'>
          <Col>
            <Title>Lesson 1</Title>
          </Col>
          <Col>
            <Title level={ 2 }>Setup your first api request</Title>
          </Col>
        </Row>
        <List
          header={ <div>Todo:</div> }
          size="small"
          bordered
          dataSource={ data }
          renderItem={ item => (
            <List.Item>
              { item }
            </List.Item>
          ) }
        />
        <Space direction='vertical' size={ 'large' }>
          <Text>Curl Example of api request - you can try this in an open terminal to make sure you have things set up correctly.</Text>
        </Space>
        <Input.Group compact>
          <Input style={ { width: 'calc(100% - 35px)' } } defaultValue={ `curl -H "Authorization: ${token}" https://api.bobiverse-learn.com/bobs` } />
          <Tooltip title="copy">
            <Button icon={ <CopyOutlined /> } />
          </Tooltip>
        </Input.Group>
        <Text>If you tried all that and got a response that looks like this back you have it set up correctly.</Text>
        <pre style={ { backgroundColor: 'black', color: 'green' } }>
          { `
    "data": [
        {
            "id": 1,
            "name": "Bob",
            "user_id": 1,
            "created_at": "2021-11-19T03:49:09.116+00:00",****
            "updated_at": "2021-11-19T03:49:09.116+00:00",
            "minerals": null,
            "location_id": 1,
            "coordinates": {
                "x": 1,
                "y": 0,
                "z": -5
            },
            "location": {
                "id": 1,
                "system": "Sol",
                "created_at": "2021-11-19T03:49:08.646+00:00",
                "updated_at": "2021-11-19T03:49:08.647+00:00"
            },
            "drones": [
                {
                    "id": 1,
                    "bob_id": 1,
                    "size": "md",
                    "job_complete_at": null,
                    "created_at": "2021-11-19T03:49:09.126+00:00",
                    "updated_at": "2021-11-19T03:49:09.126+00:00",
                    "target_id": null
                },
                {
                    "id": 2,
                    "bob_id": 1,
                    "size": "md",
                    "job_complete_at": null,
                    "created_at": "2021-11-19T03:49:09.131+00:00",
                    "updated_at": "2021-11-19T03:49:09.131+00:00",
                    "target_id": null
                }
            ]
        }
    ]
`}
        </pre>
      </Space>
    </LessonLayout>
  )
}

export default Lessons

const SiteContent = styled.div`
  min-height: 80vh;
  padding: 24px;
  background: #fff;
`
