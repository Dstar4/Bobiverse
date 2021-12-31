import {Table, Typography} from 'antd'
import {Coordinates, Bob, Location} from '../../types/global'
const {Title} = Typography

export function BobsTable({
  bobs,
  setSelectedBob,
}: {
  bobs: Bob[]
  setSelectedBob: any
}) {
  const dataSource = bobs
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location Id',
      dataIndex: 'location_id',
      key: 'locationId',
    },
    // {
    //   title: 'System',
    //   dataIndex: 'location',
    //   key: 'locationName',
    //   render: (location: Location) => <>{location.system}</>,
    // },
    {
      title: 'Minerals',
      dataIndex: 'minerals',
      key: 'minerals',
      // sorter: (a, b) => a.minerals - b.minerals,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Coordinates',
      dataIndex: 'coordinates',
      key: 'coordinates',
      render: (coordinates: Coordinates) => (
        <>
          ({coordinates.x} {coordinates.y} {coordinates.z})
        </>
      ),
    },
  ]

  return (
    <div style={{margin: 16}}>
      <Title level={4}>Bobs</Title>
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        // onChange={onChange}
        // pagination={{pageSize: 50}}
        pagination={{hideOnSinglePage: true}}
        // scroll={{y: 240}}
        rowKey={record => record.id}
        rowSelection={{
          type: 'radio',
          // selectedRowKeys: ['id'],
          onChange: (selectedRowKeys: any) => {
            setSelectedBob(selectedRowKeys[0])
          },
        }}
      />
    </div>
  )
}
