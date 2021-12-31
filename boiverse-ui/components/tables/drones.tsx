import {Table, Typography} from 'antd'
import {Coordinates, Drone} from '../../types/global'
const {Title} = Typography

export function DronesTable({drones}: {drones: Drone[]}) {
  const dataSource = drones

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Bob Id',
      dataIndex: 'bob_id',
      key: 'bobId',
    },
    {
      title: 'Deployed',
      dataIndex: 'deployed',
      key: 'deployed',
      render: (deployed: boolean) => (deployed ? 'Yes' : 'No'),
    },
    {
      title: 'Job Complete At',
      dataIndex: 'job_complete_at',
      key: 'jobCompleteAt',
      render: (completeAt: string) =>
        completeAt ? <>{completeAt}</> : 'No job',
    },
    {
      title: 'Target Id',
      dataIndex: 'target_id',
      key: 'targetId',
      render: (target: number) => (target ? <>{target}</> : 'No target'),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      // sorter: (a, b) => a.minerals - b.minerals,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Coordinates',
      dataIndex: 'coordinates',
      key: 'coordinates',
      render: (coordinates: Coordinates) => {
        if (!coordinates) {
          return <>Not Deployed</>
        }
        return (
          <>
            ({coordinates.x}, {coordinates.y} {coordinates.z})
          </>
        )
      },
    },
  ]

  return (
    <div style={{margin: 16}}>
      <Title level={4}>Drones</Title>
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        // onChange={onChange}
        pagination={{pageSize: 50, hideOnSinglePage: true}}
        scroll={{y: 240}}
      />
    </div>
  )
}
