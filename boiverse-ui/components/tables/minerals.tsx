import {Table, Typography} from 'antd'
import {Coordinates, Mineral} from '../../types/global'
const {Title} = Typography

export function MineralsTable({minerals}: {minerals: Mineral[]}) {
  const dataSource = minerals

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log('params', pagination, filters, sorter, extra)
  // }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Location Id',
      dataIndex: 'location_id',
      key: 'locationId',
    },
    {
      title: 'Payload',
      dataIndex: 'payload',
      key: 'payload',
      sorter: (a: Mineral, b: Mineral) => a.payload - b.payload,
    },
    {
      title: 'Coordinates',
      dataIndex: 'coordinates',
      key: 'coordinates',
      render: (coordinates: Coordinates) => (
        <>
          ({coordinates.x}, {coordinates.y}, {coordinates.z} )
        </>
      ),
    },
  ]

  return (
    <div style={{margin: 16}}>
      <Title level={4}>Minerals</Title>

      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        // onChange={onChange}
        pagination={{pageSize: 200, hideOnSinglePage: true}}
        scroll={{y: 240}}
      />
    </div>
  )
}
