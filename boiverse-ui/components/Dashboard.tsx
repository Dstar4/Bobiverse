import styled from '@emotion/styled'
import { Row, Col, Divider } from 'antd'
import { useCookies } from 'react-cookie'
import PageLayout from '../components/Layout'
import axios from 'axios'
import useSWR from 'swr'
import { Bob, Drone } from '../types/global'

export default function Dashboard() {
  const [cookies] = useCookies(['bobiverse-token'])
  const token = cookies['bobiverse-token']
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || ''

  const fetcher = (url: string) => axios.request({
    url: url,
    method: 'GET',
    headers: {
      Authorization: token
    }
  })

  const { data, error } = useSWR(`${url}/bobs`, fetcher)
  if (!data?.data.data.length) return 'Loading...'
  const bobs: Bob[] = data?.data.data
  console.log("Bob", bobs)
  return (
    <Row align='top' style={ { minHeight: '80vh' } }>
      <Col >
        { bobs.map(bob => (
          <div>
            <h3><strong>Name:</strong> { bob.name }</h3>
            <p><strong>Minerals:</strong> { bob.minerals || '0' }</p>
            <p><strong>Location: </strong>{ bob.location.system }</p>
            <p><strong>Location [x,y,z]</strong>: { JSON.stringify(Object.values(bob.coordinates)) }</p>
            <Divider />
            <h3>Drones</h3>
            { bob.drones.map((drone) => (
              <div>
                <p><strong>Drone Id:</strong> { drone.id }</p>
                <p><strong>Drone Target:</strong> { drone.target_id }</p>
                <p><strong>Job Complete At:</strong> { drone.job_complete_at }</p>
                <p><strong>Size:</strong> { drone.size }</p>
              </div>
            )) }
            <Divider />
          </div>
        )) }
      </Col>
    </Row>

  )
}